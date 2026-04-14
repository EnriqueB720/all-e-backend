import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MintStatus } from '@prisma/client';
import { PrismaService } from '../datasource/prisma/prisma.service';
import { MintQueueService } from './mint-queue.service';

/**
 * Watches stuck in PENDING for more than STUCK_THRESHOLD_MS without a txHash
 * are re-enqueued. Catches jobs lost if Redis was down when the watch was
 * created, or if the worker crashed between enqueue and execution.
 */
@Injectable()
export class MintReconcilerService {
  private readonly logger = new Logger(MintReconcilerService.name);
  private static readonly STUCK_THRESHOLD_MS = 2 * 60 * 1000;

  constructor(
    private readonly prisma: PrismaService,
    private readonly mintQueue: MintQueueService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async reconcileStuckMints(): Promise<void> {
    const cutoff = new Date(Date.now() - MintReconcilerService.STUCK_THRESHOLD_MS);

    const stuck = await this.prisma.watch.findMany({
      where: {
        mintStatus: MintStatus.PENDING,
        txHash: null,
        lastSynced: { lt: cutoff },
      },
      select: { id: true },
    });

    if (stuck.length === 0) return;

    this.logger.log(`Re-enqueueing ${stuck.length} stuck mint(s)`);
    for (const { id } of stuck) {
      await this.mintQueue.enqueueMint({ watchId: id });
    }
  }
}

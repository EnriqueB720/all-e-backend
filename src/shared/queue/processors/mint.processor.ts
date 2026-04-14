import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { MintStatus } from '@prisma/client';
import { PrismaService } from '../../datasource/prisma/prisma.service';
import { BlockchainService } from '../../blockchain/blockchain.service';
import {
  MINT_JOB,
  MINT_QUEUE,
  MintJobData,
  TRANSFER_JOB,
  TransferJobData,
} from '../queue.constants';

@Processor(MINT_QUEUE)
export class MintProcessor extends WorkerHost {
  private readonly logger = new Logger(MintProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly blockchain: BlockchainService,
  ) {
    super();
  }

  async process(job: Job<MintJobData | TransferJobData>) {
    if (job.name === MINT_JOB) return this.handleMint(job as Job<MintJobData>);
    if (job.name === TRANSFER_JOB) return this.handleTransfer(job as Job<TransferJobData>);
    throw new Error(`Unknown job name: ${job.name}`);
  }

  private async handleMint(job: Job<MintJobData>) {
    const { watchId } = job.data;
    this.logger.log(`[mint] job=${job.id} watchId=${watchId} attempt=${job.attemptsMade + 1}`);

    const watch = await this.prisma.watch.findUnique({
      where: { id: watchId },
      select: {
        id: true,
        metadataURI: true,
        mintStatus: true,
        user: { select: { walletAddress: true } },
      },
    });

    if (!watch) throw new Error(`Watch ${watchId} not found`);
    if (watch.mintStatus === MintStatus.MINTED) {
      this.logger.warn(`Watch ${watchId} already minted — skipping`);
      return;
    }
    if (!watch.metadataURI) throw new Error(`Watch ${watchId} has no metadataURI`);
    if (!watch.user.walletAddress) throw new Error(`Watch ${watchId} owner has no wallet`);

    try {
      const result = await this.blockchain.mintWatch({
        toAddress: watch.user.walletAddress,
        tokenId: watch.id,
        metadataCid: watch.metadataURI,
      });

      await this.prisma.watch.update({
        where: { id: watchId },
        data: {
          tokenId: result.tokenId,
          txHash: result.txHash,
          mintStatus: MintStatus.MINTED,
        },
      });

      this.logger.log(`[mint] watchId=${watchId} MINTED tx=${result.txHash}`);
    } catch (err) {
      const isFinalAttempt = job.attemptsMade + 1 >= (job.opts.attempts ?? 1);
      if (isFinalAttempt) {
        await this.prisma.watch.update({
          where: { id: watchId },
          data: { mintStatus: MintStatus.FAILED },
        });
        this.logger.error(`[mint] watchId=${watchId} FAILED permanently: ${err}`);
      }
      throw err;
    }
  }

  private async handleTransfer(job: Job<TransferJobData>) {
    const { watchId, fromAddress, toAddress } = job.data;
    this.logger.log(
      `[transfer] job=${job.id} watchId=${watchId} from=${fromAddress} to=${toAddress}`,
    );

    const watch = await this.prisma.watch.findUnique({
      where: { id: watchId },
      select: { id: true, tokenId: true, mintStatus: true },
    });

    if (!watch) throw new Error(`Watch ${watchId} not found`);
    if (watch.mintStatus !== MintStatus.MINTED || !watch.tokenId) {
      throw new Error(`Watch ${watchId} is not minted yet — cannot transfer`);
    }

    const result = await this.blockchain.transferWatch({
      fromAddress,
      toAddress,
      tokenId: Number(watch.tokenId),
    });

    await this.prisma.watch.update({
      where: { id: watchId },
      data: { txHash: result.txHash },
    });

    this.logger.log(`[transfer] watchId=${watchId} OK tx=${result.txHash}`);
  }
}

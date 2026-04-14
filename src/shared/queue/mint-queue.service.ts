import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import {
  MINT_JOB,
  MINT_QUEUE,
  MintJobData,
  TRANSFER_JOB,
  TransferJobData,
} from './queue.constants';

@Injectable()
export class MintQueueService {
  constructor(
    @InjectQueue(MINT_QUEUE) private readonly queue: Queue,
  ) {}

  async enqueueMint(data: MintJobData) {
    return this.queue.add(MINT_JOB, data, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5_000 },
      removeOnComplete: { age: 24 * 3600, count: 1000 },
      removeOnFail: { age: 7 * 24 * 3600 },
    });
  }

  async enqueueTransfer(data: TransferJobData) {
    return this.queue.add(TRANSFER_JOB, data, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5_000 },
      removeOnComplete: { age: 24 * 3600, count: 1000 },
      removeOnFail: { age: 7 * 24 * 3600 },
    });
  }
}

import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { MINT_QUEUE } from './queue.constants';
import { MintQueueService } from './mint-queue.service';
import { MintProcessor } from './processors/mint.processor';
import { MintReconcilerService } from './mint-reconciler.service';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST') as string,
          port: Number(config.get('REDIS_PORT')),
        },
      }),
    }),
    BullModule.registerQueue({ name: MINT_QUEUE }),
  ],
  providers: [MintQueueService, MintProcessor, MintReconcilerService],
  exports: [MintQueueService],
})
export class QueueModule {}

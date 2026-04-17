import { Module } from '@nestjs/common';
import { TransferRequestResolver } from './transfer-request.resolver';
import { TransferRequestService } from './transfer-request.service';
import { PrismaModule } from '@prisma-datasource';
import { WatchModule } from '../watch/watch.module';

@Module({
  imports: [PrismaModule, WatchModule],
  providers: [TransferRequestResolver, TransferRequestService],
  exports: [TransferRequestService],
})
export class TransferRequestModule {}

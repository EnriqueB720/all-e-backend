import { Module } from '@nestjs/common';
import { OwnershipLogResolver } from './ownership-log.resolver';

import { OwnershipLogService } from './ownership-log.service';

@Module({
  imports: [],
  providers: [OwnershipLogResolver, OwnershipLogService],
  exports: [OwnershipLogResolver, OwnershipLogService],
})
export class OwnershipLogModule {}
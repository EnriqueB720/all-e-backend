import { Module } from '@nestjs/common';
import { WatchResolver } from './watch.resolver';

import { WatchService } from './watch.service';
import { OwnershipLogModule } from '../ownership-log/ownership-log.module';


@Module({
  imports: [OwnershipLogModule],
  providers: [WatchResolver, WatchService],
  exports: [WatchResolver, WatchService],
})
export class WatchModule {}
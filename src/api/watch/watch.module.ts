import { Module } from '@nestjs/common';
import { WatchResolver } from './watch.resolver';

import { WatchService } from './watch.service';

@Module({
  imports: [],
  providers: [WatchResolver, WatchService],
  exports: [WatchResolver, WatchService],
})
export class WatchModule {}
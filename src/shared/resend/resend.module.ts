import { Global, Module } from '@nestjs/common';
import { ResendService } from './resend.service';
import { ConfigModule } from '../config/config.module';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [ResendService],
  exports: [ResendService],
})
export class ResendModule {}

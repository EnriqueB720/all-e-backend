import { Module } from '@nestjs/common';
import { ContactResolver } from './contact.resolver';
import { ConfigModule } from '../../shared/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [ContactResolver],
})
export class ContactModule {}

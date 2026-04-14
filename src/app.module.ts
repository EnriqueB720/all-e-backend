import { Module } from '@nestjs/common';

import { PrismaModule } from './shared/datasource/prisma/prisma.module';
import { ConfigModule } from 'src/shared/config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './shared/auth/auth.module';
import { UserModule, WatchModule, OwnershipLogModule } from '@apis';
import { PinataModule } from './shared/pinata/pinata.module';
import { ResendModule } from './shared/resend/resend.module';
import { ContactModule } from './api/contact/contact.module';
import { BlockchainModule } from './shared/blockchain/blockchain.module';
import { QueueModule } from './shared/queue/queue.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET
    }),
    PrismaModule,
    ConfigModule,
    PinataModule,
    BlockchainModule,
    QueueModule,
    ResendModule,
    ContactModule,
    AuthModule,
    UserModule,
    WatchModule,
    OwnershipLogModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

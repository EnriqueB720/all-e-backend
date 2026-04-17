import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { GqlThrottlerGuard } from './shared/throttler/gql-throttler.guard';

import { PrismaModule } from './shared/datasource/prisma/prisma.module';
import { ConfigModule } from 'src/shared/config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './shared/auth/auth.module';
import { UserModule, WatchModule, OwnershipLogModule } from '@apis';
import { TransferRequestModule } from './api/transfer-request/transfer-request.module';
import { PinataModule } from './shared/pinata/pinata.module';
import { ResendModule } from './shared/resend/resend.module';
import { ContactModule } from './api/contact/contact.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000, limit: 10 },
      { name: 'medium', ttl: 60_000, limit: 100 },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
    PrismaModule,
    ConfigModule,
    PinataModule,
    ResendModule,
    ContactModule,
    AuthModule,
    UserModule,
    WatchModule,
    OwnershipLogModule,
    TransferRequestModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: GqlThrottlerGuard },
  ],
})
export class AppModule {}

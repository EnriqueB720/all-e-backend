import { Module } from '@nestjs/common';

import { PrismaModule } from './shared/datasource/prisma/prisma.module';
import { ConfigModule } from 'src/shared/config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './shared/auth/auth.module';
import { UserModule, WatchModule, OwnershipLogModule } from '@apis';

@Module({
  imports: [
    JwtModule.register({
      global: true, 
      secret: process.env.JWT_SECRET
    }),
    PrismaModule,
    ConfigModule,
    AuthModule,
    UserModule,
    WatchModule,
    OwnershipLogModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';

import { PrismaModule } from './shared/datasource/prisma/prisma.module';
import { ConfigModule } from 'src/shared/config/config.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

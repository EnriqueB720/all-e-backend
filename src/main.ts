import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './shared/config/config.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  const PORT = config.get('PORT') as number;
  const allowedOrigins = (config.get('CORS_ORIGINS') as string | undefined)
    ?.split(',')
    .map((o) => o.trim())
    .filter(Boolean) ?? ['http://localhost:3000'];

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(json({ limit: '150mb' }));

  await app.listen(PORT);

  Logger.log(`App Running in port ${PORT}`, 'App Initialization');
}
bootstrap();

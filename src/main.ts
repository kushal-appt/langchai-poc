import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const iNestApp: INestApplication<unknown> =
  await NestFactory.create(AppModule);

  const iNestConfigService: ConfigService = await iNestApp.get(ConfigService);

  const app: NestFastifyApplication =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({
        logger: true,
      }),
    );
  const cors = { allowedHeaders: '*', origin: '*', credentials: true };

  app.enableCors(cors);

  const port: number = (iNestConfigService.get<number>('port') as number);

  await app.listen(port, '0.0.0.0', () =>
    console.info(`🚀 Server ready at http://${iNestConfigService.get('host')}:${port}/graphql`),
  );
}

bootstrap();

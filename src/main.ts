import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENVS_DIR_PATH } from './envs/envs-dir-path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  console.log(`${ENVS_DIR_PATH}`);
}

bootstrap();

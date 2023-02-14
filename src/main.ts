import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Medipass Backend')
    .setDescription('Backend API description')
    .setVersion('1.0')
    .addTag('api list')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .addSecurity('access-token', {
      type: 'http',
      scheme: 'bearer',
      name: 'JWT',
      in: 'header',
    })
    .addSecurityRequirements('access-token')
    .build();
  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}

bootstrap();

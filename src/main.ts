import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Twendee cms')
    .setDescription('Twendee cms swagger ui')
    .setVersion('1.0')
    .addTag('Twendee cms api interface')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`docs`, app, document);

  await app.listen(8080);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { validationExceptionFactory } from './common/validation-exception.factory';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  /** Configuration Options */
  const config = app.get(ConfigService);

  /** Validation Pipe Setup (DTOs) */
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationExceptionFactory,
    }),
  );

  /** Swagger Docs Setup */
  const swaggerOptions = new DocumentBuilder()
    .setTitle('NestJS TypeORM API Boilerplate')
    .setDescription(
      'A simple API boilerplate for scalable production-grade APIs',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('swagger', app, swaggerDocument);

  await app.listen(config.appPort);
}
bootstrap();

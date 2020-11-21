import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { AllExceptionsFilter } from './config/all-exceptions-filter';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Move Cred')
    .setDescription(
      'Move Cred API Doc \n - if the route has a lock symbol it is necessary to send a token',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  console.log('Port', process.env.PORT || 3000);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

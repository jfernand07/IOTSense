import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('IOTSense API')
    .setDescription('Documentación de la API de monitoreo y sensores.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument, {
    swaggerOptions: { persistAuthorization: true },
  });

  const configService = app.get<ConfigService>(ConfigService);
  const port = Number(configService.get<string>('PORT') ?? 3002);

  await app.listen(port);

  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📖 Documentación disponible en http://localhost:${port}/api`);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});

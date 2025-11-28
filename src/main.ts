import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Enable CORS for development
  app.enableCors();
  
  // Set global prefix for API routes if needed
  // app.setGlobalPrefix('api');
  
  await app.listen(process.env.PORT || 3004);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch(err => {
  console.error('Failed to start application', err);
  process.exit(1);
});

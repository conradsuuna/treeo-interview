import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
// import * as csurf from 'csurf';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.use(csurf());
  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();

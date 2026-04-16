import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚗 Toll Plaza API running on http://localhost:${port}`);
  console.log(`   GET  /logs  → Fetch all toll records`);
  console.log(`   POST /logs  → Create a new toll entry`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.listen(AppConfig.port,()=>{
  console.log(`service :${AppConfig.appName} => server is listening on port: ${AppConfig.port}`)
})
}
bootstrap();

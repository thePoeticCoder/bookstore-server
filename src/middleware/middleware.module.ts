import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './jwtAuth.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppConfig } from 'src/config';

@Module({
imports: [JwtModule.register({
    secret: AppConfig.JWT_SECRET_KEY,
  })],
  controllers: [],
  providers: [JwtAuthGuard,JwtService]
})
export class MiddlewareModule {}




import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { SeedingMiddleware } from './SeedingMiddleware';

@Module({})
export class SeedingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SeedingMiddleware).forRoutes('*');
  }
}

import { Module } from '@nestjs/common';
import { DispathcerModule } from './dispathcer/dispathcer.module';

@Module({
  imports: [DispathcerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

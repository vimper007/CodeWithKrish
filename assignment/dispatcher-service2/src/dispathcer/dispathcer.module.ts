import { Module } from '@nestjs/common';
import { DispathcerService } from './dispathcer.service';
import { DispathcerController } from './dispathcer.controller';

@Module({
  providers: [DispathcerService],
  controllers: [DispathcerController]
})
export class DispathcerModule {}

import { Module } from '@nestjs/common';
import { DispatchService } from './dispatch.service';
import { DispatchController } from './dispatch.controller';

@Module({
  providers: [DispatchService],
  controllers: [DispatchController]
})
export class DispatchModule {}

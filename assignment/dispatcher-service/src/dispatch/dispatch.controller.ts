import { Controller, Get, Post } from '@nestjs/common';
import { DispatchService } from './dispatch.service';

@Controller('dispatch')
export class DispatchController {
  constructor(private dispatcherService: DispatchService) {}

//   dispatch/dispatch-locations
  @Post('dispatch-locations')
  async dispatchLocations(item:any) {
   return this.dispatcherService.dispatchLocations(item)
  }
}

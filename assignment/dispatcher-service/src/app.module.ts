import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DispatchModule } from './dispatch/dispatch.module';

@Module({
  imports: [DispatchModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

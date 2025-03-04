import { Module } from '@nestjs/common';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [],
  providers: [NotificationService],
})
export class AppModule {}

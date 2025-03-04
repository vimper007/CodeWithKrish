import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
    constructor(private notificationService:NotificationService){}
    @Get()
    orderConfirmedNotification(){
        this.notificationService.orderConfirmedNotification()
    }
}

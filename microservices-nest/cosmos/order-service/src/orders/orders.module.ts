import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entity/order.entitiy";
import { OrderItem } from "./entity/oreder-item.entitiy";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem])
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}

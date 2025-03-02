import { Module } from "@nestjs/common";
import { Column } from "typeorm";
import { OrdersModule } from "./orders/orders.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./orders/entity/order.entitiy";
import { OrderItem } from "./orders/entity/oreder-item.entitiy";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.HOSTNAME || "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "cosmos",
      entities: [Order, OrderItem],
      synchronize: true, //not in prod only dev
    }),
    OrdersModule,
    HttpModule
  ],
})
export class AppModule {}

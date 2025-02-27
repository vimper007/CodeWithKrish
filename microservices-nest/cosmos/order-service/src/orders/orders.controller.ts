import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./entity/order.entitiy";
import { UpddateOrderStatus } from "./dto/update-order.dto";

@Controller("orders")
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.orderService.create(createOrderDto);
  }
  @Get(":id")
  async fetch(@Param("id") id: number) {
    return await this.orderService.fetch(id);
  }
  @Get()
  async fetchAll() {
    return await this.orderService.fetchAll();
  }

  @Patch(":id/status")
  async updateOrderStatus(
    @Param("id") id: number,
    @Body() updateOrderStatus: UpddateOrderStatus
  ) {
    return this.orderService.updateOrderStatus(id, updateOrderStatus);
  }
}

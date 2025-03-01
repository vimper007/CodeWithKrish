import { IsEnum } from "class-validator";

export enum OrderStatus {
  PENDING = "PENIDING",
  CONFIRMED = "CONFIRMED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export class UpddateOrderStatus {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./entity/order.entitiy";
import { OrderItem } from "./entity/oreder-item.entitiy";
import { OrderStatus, UpddateOrderStatus } from "./dto/update-order.dto";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, items } = createOrderDto;
    const order = this.orderRepository.create({
      customerId,
      status: "PENDING",
    });

    const savedOrder = await this.orderRepository.save(order);

    const orderItems = items.map((item) =>
      this.orderItemRepository.create({
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        order: savedOrder,
      })
    );
    await this.orderItemRepository.save(orderItems);
    const foundOrder = await this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ["items"],
    });

    if (!foundOrder) {
      throw new Error("Order not found");
    }

    return foundOrder;
  }

  async fetch(id: any) {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ["items"],
    });
  }

  async fetchAll() {
    return await this.orderRepository.find({ relations: ["items"] });
  }

  async updateOrderStatus(id: number, updateStatus: UpddateOrderStatus) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id: ${id} is not found`);
    }
    if (
      order.status === OrderStatus.DELIVERED ||
      order.status === OrderStatus.CANCELLED
    ) {
      throw new BadRequestException(
        `Order status cannot be changed when its deleivered or cancelled`
      );
    }
    order.status = updateStatus.status;
    return this.orderRepository.save(order);
  }
}

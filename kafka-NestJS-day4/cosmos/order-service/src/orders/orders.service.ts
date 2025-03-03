import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { createOrderDto } from './dto/create-order.dto';
import { OrderStatus, UpdateOrderStatus } from './dto/update-order.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Kafka } from 'kafkajs';
@Injectable()
export class OrdersService implements OnModuleInit {
  // private readonly Kafka = new Kafka({brokers: ["3.0.159.213:9092"]});
  private readonly Kafka = new Kafka({ brokers: ['localhost:9092'] });
  private readonly producer = this.Kafka.producer();
  private readonly consumer = this.Kafka.consumer({
    groupId: 'vimukthi-perera-order-service',
  });
  private readonly inventoryServiceUrl = 'http://localhost:3001/products';
  private readonly customerServiceUrl = 'http://localhost:3002/customers';

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly httpService: HttpService,
  ) {}
  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
  }

  async create(createOrderDto: createOrderDto): Promise<any> {
    const { customerId, items } = createOrderDto;
    //--------customer
    // Validate customer exists
    let customerName = '';
    try {
      const response$ = this.httpService.get(
        `${this.customerServiceUrl}/${customerId}`,
      );
      const response = await lastValueFrom(response$);
      customerName = response.data.name;
    } catch (error) {
      throw new BadRequestException(
        `Customer ID ${customerId} does not exist.`,
      );
    }
    console.log("create:::vimukthi.perera.order.create")
    this.producer.send({
      topic: 'vimukthi.perera.order.create',
      messages: [
        { value: JSON.stringify({ customerId, customerName, items }) },
      ],
    });
    return { message: 'Order is placed, waiting inventory service to process' };
    //-----------------

    //---------
    /*
    for (const item of items) {
      try {
        const response$ = this.httpService.get(
          `${this.inventoryServiceUrl}/${item.productId}/validate?quantity=${item.quantity}`,
        );
        const response = await lastValueFrom(response$);
        if (!response.data.available) {
          throw new BadRequestException(
            `Product ID ${item.productId} is out of stock.`,
          );
        }
      } catch (error) {
        throw new BadRequestException(
          `Error checking stock for Product ID ${item.productId}: ${error.message}`,
        );
      }
    }
    //---------

    const order = this.orderRepository.create({
      customerId,
      status: 'PENDING',
    });
    const savedOrder = await this.orderRepository.save(order);

    const orderItems = items.map((item) =>
      this.orderItemRepository.create({
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        order: savedOrder,
      }),
    );
    const savedOrderItems = await this.orderItemRepository.save(orderItems);

    // Reduce stock in Inventory Service
    for (const item of savedOrderItems) {
      try {
        await lastValueFrom(
          this.httpService.patch(
            `${this.inventoryServiceUrl}/${item.productId}/quantity`,
            { quantity: item.quantity },
          ),
        );
      } catch (error) {
        throw new BadRequestException(
          `Failed to reduce stock for Product ID ${item.productId}`,
        );
      }
    }
    return { ...savedOrder, customerName, items: orderItems };
    */
  }
  async fetch(id: any) {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
  }
  async fetchAll() {
    return await this.orderRepository.find({ relations: ['items'] });
  }

  async updateOrderStaus(id: number, updateStatus: UpdateOrderStatus) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`order with id: ${id} is not found`);
    }
    if (
      order.status === OrderStatus.DELIVERED ||
      order.status === OrderStatus.CANCELLED
    ) {
      throw new BadRequestException(
        `order status cannot be changed when its delivered or cancelled`,
      );
    }
    order.status = updateStatus.status;
    return await this.orderRepository.save(order);
  }

  async consumeConfirmedOrders() {}

  async consumeInventoryUpdate() {
    await this.consumer.subscribe({
      topic: 'vimukthi.perera.inventory.update',
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log('Inventory update received:', message.value.toString());
        const { customerId, customerName, items } = JSON.parse(message.value.toString());

        // Save order in DB
        const order = this.orderRepository.create({
          customerId,
          status: OrderStatus.CONFIRMED,
        });
        const savedOrder = await this.orderRepository.save(order);

        const orderItems = items.map((item) =>
          this.orderItemRepository.create({
            productId: item.productId,
            price: item.price,
            quantity: item.quantity,
            order: savedOrder,
          }),
        );
        await this.orderItemRepository.save(orderItems);

        // publish order.confirmed event
        await this.producer.send({
          topic: 'vimukthi.perera.order.confirmed',
          messages: [{ value: JSON.stringify({ customerId, customerName, items }) }],
        });

        console.log('Order confirmed and event published.');
      },
    });
  }
}

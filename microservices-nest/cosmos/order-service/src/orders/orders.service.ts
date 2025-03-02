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
import { HttpService } from "@nestjs/axios";
import { DataSource } from "typeorm";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private httpService:HttpService,
    private dataSource: DataSource
  ) {}

  /**
   * Creates a new order.
   * 
   * @param {CreateOrderDto} createOrderDto - The data transfer object containing order details.
   * @returns {Promise<any>} - A promise that resolves to the created order with customer details.
   * 
   * @throws {NotFoundException} - If the customer with the given ID is not found.
   * @throws {Error} - If the order is not found after saving.
   * 
   */
  async create(createOrderDto: CreateOrderDto): Promise<any> {
    // Validate req
    if(!createOrderDto?.customerId) throw new BadRequestException("Customer Id cannot be empty")
    for(const item of createOrderDto.items){
      if(!item.productId || !item.price || !item.quantity) throw new BadRequestException("Invalid Product Id, Price or Quantity")
    }
    // Extracts customerId and items from createOrderDto.`
    const { customerId, items } = createOrderDto;
    // Fetches customer details from the customer service.
    const response = await this.httpService.axiosRef.get(`http://localhost:3002/customers/${customerId}`)
    if(!response.data) throw new NotFoundException(`Customer with ${customerId} not found!`)

      
      const queryRunner = this.dataSource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()
      try {
      // Validate Quantity
      for(const item of items){
        const  stockResponse = await this.httpService.axiosRef.get(`http://localhost:3001/inventory/${item.productId}/validate?quantity=${item.quantity}`)
        console.log(response.data)
        if (!stockResponse.data.available) throw new BadRequestException(`Insufficient stock for product ${item.productId} or product not found!`);
        if(!stockResponse.data) throw new BadRequestException(`Bad Endpoint!`)
      }
    
    // const order = this.orderRepository.create({
    //   customerId,
    //   status: "PENDING",
    // });

    // const savedOrder = await this.orderRepository.save(order);

    // const orderItems = items.map((item) =>
    //   this.orderItemRepository.create({
    //     productId: item.productId,
    //     price: item.price,
    //     quantity: item.quantity,
    //     order: savedOrder,
    //   }),
    // );
    // await this.orderItemRepository.save(orderItems);
    // const foundOrder = await this.orderRepository.findOne({
    //   where: { id: savedOrder.id },
    //   relations: ["items"],
    // });

    // if (!foundOrder) {
    //   throw new Error("Order not found");
    // }

    // return {...foundOrder,customerName:response.data.name, customerEmail:response.data.email};


    // Switching from repository methods to query manager for transactional consistency----------------------------------------------
     
    
    const order = queryRunner.manager.create(Order,{
      customerId,
      status: "PENDING",
    })

    const savedOrder = await queryRunner.manager.save(Order,order);
    let orderItems:any;
    for(const item of items){
      orderItems = queryRunner.manager.create(OrderItem,{
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        order: savedOrder,
      })
    }
    await queryRunner.manager.save(OrderItem,orderItems)
    // --------------------------------------------------------------------------------------------------------------------------------
    for(const item of items){
      const inventoryResponse = await this.httpService.axiosRef.patch(`http://localhost:3001/inventory/${item.productId}/reduce?quantity=${item.quantity}`)
      if(inventoryResponse.statusText !== "OK") throw new Error("Error reducing stock")
        // return inventoryResponse.data
    }
    // --------------------------------------------------------------------------------------------------------------------------------
    await queryRunner.commitTransaction();
    const foundOrder = await this.orderRepository.findOne({where:{id:savedOrder.id},relations:["items"]})
    if(!foundOrder) throw new Error("Order not found")
    return {...foundOrder,customerName:response.data.name, customerEmail:response.data.email};

  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw(error)
  } finally {
    await queryRunner.release() 
  }

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
        `Order status cannot be changed when its deleivered or cancelled`,
      );
    }
    order.status = updateStatus.status;
    return this.orderRepository.save(order);
  }
}

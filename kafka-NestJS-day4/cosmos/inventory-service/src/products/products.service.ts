import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Kafka } from 'kafkajs';

@Injectable()
export class ProductsService implements OnModuleInit {
  // private readonly kafka = new Kafka({ brokers: ['3.0.159.213:9092'] });
  private readonly kafka = new Kafka({ brokers: ['localhost:9092'] });
  private readonly producer = this.kafka.producer();
  private readonly consumer = this.kafka.consumer({
    groupId: 'vimukthi-perera-inventory-service',
    sessionTimeout: 30000, // Default is 10000ms
    heartbeatInterval: 5000, // Default is 3000ms
  });

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumerOrderCreated();
  }

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async validateStock(
    id: number,
    quantity: number,
  ): Promise<{ available: boolean }> {
    const product = await this.getProductById(id);
    return { available: product.quantity >= quantity };
  }
  async reduceStock(id: number, quantity: number): Promise<Product> {
    const product = await this.getProductById(id);
    if (product.quantity < quantity) {
      throw new BadRequestException(`Not enough stock for Product ID ${id}`);
    }
    product.quantity -= quantity;
    return this.productRepository.save(product);
  }
  // --------------------------------Kafka------------------------------

  async consumerOrderCreated() {
    await this.consumer.subscribe({
      topic: 'vimukthi.perera.order.create',
      fromBeginning: true,
    });

    console.log("consumer:::vimukthi.perera.order.create")
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log("consumer eachMessage:::vimukthi.perera.order.create")
        const { customerId, customerName, items } = JSON.parse(
          message.value.toString(),
        );
        for (const item of items) {
          await this.reduceStock(item.productId, item.quantity);
        }
        console.log("produce:::vimukthi.perera.inventory.update")
        await this.producer.send({
          topic: 'vimukthi.perera.inventory.update',
          messages: [
            { value: JSON.stringify({ customerId, customerName, items }) },
          ],
        });
      },
    });
  }
}

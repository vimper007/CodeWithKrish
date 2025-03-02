import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryDto } from './dto/inventory.dto';
import { Repository } from 'typeorm';
import { Inventory } from './entity/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async createProduct(inventoryDto: InventoryDto): Promise<Inventory> {
    return await this.inventoryRepository.save(inventoryDto);
  }

  async getProductById(id: number) {
    return await this.inventoryRepository.findOne({ where: { id } });
  }

  async getAllProducts() {
    return await this.inventoryRepository.find();
  }

  async validateStock(id: number, quantity: number) {
    const product = await this.inventoryRepository.findOneBy({ id });
    return {
      available:
        product?.quantity && product?.quantity > quantity ? true : false,
    };
  }

  // PATCH /products/:id/reduce
  async reduceStock(id: number, quantity: number) {
    // Validate that quantity is a valid number
    if (typeof quantity !== 'number' || isNaN(quantity)) {
      throw new BadRequestException('Invalid quantity provided');
    }
    
    const product = await this.inventoryRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    if (product.quantity === undefined) {
      throw new BadRequestException(`Product quantity is undefined for product ${id}`);
    }
    if (product.quantity < quantity) {
      throw new BadRequestException(`Insufficient stock for product ${id}`);
    }
    console.log('product',product)
    console.log(id, quantity)
    // Use decrennt to reduce stock
    await this.inventoryRepository.decrement({ id }, 'quantity', quantity);
    return await this.inventoryRepository.findOne({ where: { id } });
  }
}

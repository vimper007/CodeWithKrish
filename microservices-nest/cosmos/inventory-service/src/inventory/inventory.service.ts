import { Body, Injectable } from '@nestjs/common';
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
}

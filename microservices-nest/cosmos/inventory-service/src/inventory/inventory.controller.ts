import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './entity/inventory.entity';
import { InventoryDto } from './dto/inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Post()
  async createProduct(@Body() inventoryDto: InventoryDto) {
    return this.inventoryService.createProduct(inventoryDto);
  }

  @Get(':id')
  async getProductById(@Param() id: number): Promise<Inventory | undefined> {
    const result = await this.inventoryService.getProductById(id);
    if (result) {
      return result;
    }
    return undefined;
  }

  @Get()
  async getAllProducts() {
    return await this.inventoryService.getAllProducts();
  }

  @Get(':id/validate')
  async validateStock(
    @Param('id') id: number,
    @Query('quantity') quantity: number,
  ) {
    return await this.inventoryService.validateStock(id, quantity);
  }

  @Patch(':id/reduce')
  async reduceStock(
    @Param('id', ParseIntPipe) id: number,
    @Query('quantity', ParseIntPipe) quantity: number,
  ) {
    console.log(id,quantity)
     await this.inventoryService.reduceStock(id, quantity);
  }
}

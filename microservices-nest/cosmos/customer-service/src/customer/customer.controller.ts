import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';
import { Customer } from './entity/customer.entity';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  // /cutomers
  @Post()
  async create(@Body() customerDto: CustomerDto): Promise<Customer> {
    return await this.customerService.createCustomer(customerDto);
  }

  // /cutomers/:id
  @Get(':id')
  async getCustomerById(@Param('id') id: number) {
    return await this.customerService.findCustomerById(id);
  }

  // /cutomers/
  @Get()
  async getAllCustomers() {
    return await this.customerService.findAllCustomers();
  }
}

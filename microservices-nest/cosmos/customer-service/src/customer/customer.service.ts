import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';
import { CustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(customerDto:CustomerDto){
    return this.customerRepository.save(customerDto)
  }

  async findCustomerById(id:number){
    return await this.customerRepository.findOneBy({id})
  }

  async findAllCustomers(){
    return await this.customerRepository.find()
  }
}

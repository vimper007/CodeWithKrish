import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dispatch } from './entity/dispatch.entity';
import { Repository } from 'typeorm';
@Injectable()
export class DispatchService {
  constructor(
    @InjectRepository(Dispatch)
    private readonly dispatchRepository: Repository<Dispatch>,
  ) {}
  async dispatchLocations(dispatchItem:any) {
    console.log("dispatchItem...........",dispatchItem)
    const dispatch = this.dispatchRepository.create(dispatchItem);
    console.log('///////////////////////////////////////')
    return this.dispatchRepository.save(dispatch)
  }

  //   async createCustomer(
//     createCustomerDto: CreateCustomerDto,
//   ): Promise<Customer> {
//     const customer = this.customerRepository.create(createCustomerDto);
//     return this.customerRepository.save(customer);
//   }
}

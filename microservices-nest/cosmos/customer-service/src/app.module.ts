import { Module } from '@nestjs/common';
import { Column } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/entity/customer.entity';
import { CustomerService } from './customer/customer.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOSTNAME || 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'cosmos',
      entities: [Customer],
      synchronize: true, //not in prod only dev
    }),
    CustomerModule,
  ],
})
export class AppModule {}

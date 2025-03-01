import { Controller, Get } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}
  @Get('/hello')
  getHello(): string {
    return this.employeeService.getHello();
  }

  @Get('/test')
  getTest(): string {
    return 'test.......';
  }

  @Get('/test2')
  getTest2(): string {
    return 'test2....';
  }

  @Get('/test3')
  getTest3(): string {
    return 'test3........';
  }
}

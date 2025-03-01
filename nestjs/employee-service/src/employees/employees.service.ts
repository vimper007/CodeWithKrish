import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesService {
  public getHello(): string {
    return 'Hello from employee';
  }
}

import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InventoryDto {
  @IsString({message: 'Name must be a string\n\n'})
  @IsNotEmpty({message: 'Name is required\n\n'})
  name: string;
  @IsNumber({ maxDecimalPlaces: 2 },{message: 'Price must be a number\n\n'})
  @IsNotEmpty({message: 'Price is required\n\n'})
  price: number;
  @IsInt({message: 'Quantity must be an integer\n\n'})
  @IsNotEmpty({message: 'Quantity is required\n\n'})
  quantity: number;
}

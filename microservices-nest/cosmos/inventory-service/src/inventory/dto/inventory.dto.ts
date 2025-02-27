import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InventoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  price: number;
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}

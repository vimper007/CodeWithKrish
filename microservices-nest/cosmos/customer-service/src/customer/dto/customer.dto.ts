import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CustomerDto {
  @IsString()
  @Length(2)
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  address: string;
}

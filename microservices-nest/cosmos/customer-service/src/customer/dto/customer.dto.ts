import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CustomerDto {
  @IsString({message: 'Name must be a string\n\n'})
  @Length(2,100, {message: 'Name must be between 2 and 100 characters\n\n'})
  @IsNotEmpty({message: 'Name is required\n\n'})
  name: string;
  @IsEmail({},{message: 'Email must be a valid email\n\n'})
  @IsNotEmpty({message: 'Email is required\n\n'})
  email: string;
  @IsString({message: 'Address must be a string\n\n'})
  @IsNotEmpty({message: 'Address is required\n\n'})
  address: string;
}

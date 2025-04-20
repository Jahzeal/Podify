import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  FirstName: string;

  @IsString()
  @IsNotEmpty()
  LastName: string;

  @IsString()
  username: string
}
//this is the auth dto file that contains the data transfer object for authentication. It uses class-validator to validate the input data. The AuthDto class has four properties: email, password, FirstName, and LastName. Each property is decorated with validation decorators to ensure that the input data is valid. The email property is validated to be in a valid email format and is required. The password, FirstName, and LastName properties are also required strings.
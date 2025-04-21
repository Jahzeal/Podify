import { IsString, IsNotEmpty } from 'class-validator';

export class createCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

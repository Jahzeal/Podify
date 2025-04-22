import {
  IsOptional,
  IsString,
} from 'class-validator';

export class searchPodcastDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  category?: string;
  
}

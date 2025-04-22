import { IsEmail, IsOptional, IsString } from 'class-validator';
export class editUserDto {

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  FirstName?: string;

  @IsString()
  @IsOptional()
  LastName?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
export class upLoadPodcastDto{
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  Audiourl?: string;

  @IsString()
  category: string;
  // episodes: number;
}
// export class deleteUserDto {
//   id: number;
// }
// export class deleteUserPodcastsDto {
//   id: number;
// }
// export class deleteUserEpisodesDto {
//   id: number;
// }

// export class editUserPodcastsDto {
//   title: string;
//   description: string;
//   image: string;
// }
// export class editUserEpisodesDto {
//   title: string;
//   description: string;
//   image: string;
// }

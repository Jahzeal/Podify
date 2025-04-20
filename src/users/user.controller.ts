import { Controller } from '@nestjs/common';
import { Get,Patch,Body} from '@nestjs/common/decorators';
import {User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { UserService } from './user.service';
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Get('user')
  getMe(@GetUser() user: User) {
    console.log(user);
    return user;
  }

  @Get('podcasts')
  getPodcasts(@GetUser('id') userId: number) {
    return this.userService.getuserPodcasts(userId);
  }

  @Get('episodes')
  getEpisodes(@GetUser('id') userId: number) {
    return this.userService.getUserEpisodes(userId);
  }
  @Patch('edit')
  editUser(@GetUser('id') userId: number, @Body() data: any) {
    return this.userService.editUser(userId, data);
  }
  
}

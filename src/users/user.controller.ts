import { Controller } from '@nestjs/common';
import { Get,Patch,Body, Delete} from '@nestjs/common/decorators';
import {User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { editUserDto } from './dto/users.dto';
import { use } from 'passport';
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) { }
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getMe(@GetUser() user: User) {
    console.log(user.FirstName);
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
  editUser(@GetUser('id') userId: number, @Body() dto:editUserDto ) {
    return this.userService.editUser(userId,dto);
  }
  @Delete('delete-user')
  deleteUser(@GetUser('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
  @Delete('DeleteUserPodcast/:podcastId')
  deletePodcast(@GetUser('id') userId: number, @Body('podcastId') podcastId: number) {
    return this.userService.deleteUserPodcasts(podcastId);
  }
  
  @Delete('DeleteUserEpisode/:episodeId')
  deleteEpisdode(@GetUser('id')userId: number, @Body('episodeId') episodeId: number) {
    return this.userService.deleteUserEpisodes(episodeId);
  }
}

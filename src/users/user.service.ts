import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  getUser(userId: number) { 
    const user = this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    return user
  }
  
  getuserPodcasts(userId: number) {
    const podcasts = this.prisma.podcast.findMany({
      where: {
        userId: userId,},
    })
    return podcasts
  }
  getUserEpisodes(userId: number) {
    const episodes = this.prisma.episode.findMany({
      where: {
        podcast: {
          userId: userId,
        },
      },
    })
    return episodes
  }

  editUser(userId: number, data: any) {
    const user = this.prisma.user.update({
      where: {
        id: userId,
      },
      data,
    })
    return user
  }
  deleteUser(userId: number) {
    const user = this.prisma.user.delete({
      where: {
        id: userId,
      },
    })
    return user
  }

}
  
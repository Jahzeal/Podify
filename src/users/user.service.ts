import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { editUserDto } from './dto/users.dto';
import { upLoadPodcastDto } from './dto/users.dto';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async getUser(userId: number) { 
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!user) {
      throw new Error('User not found');
    }
    return user
  }
  async upLoadPodcast(userId: number, dto: upLoadPodcastDto) { 
    const podcast = await this.prisma.podcast.create({
      data: {
        ...dto,
        userId: userId,
      },
    })
    if (!podcast) {
      throw new Error('Podcast not found');
    }
    return podcast
  }
  
  getuserPodcasts(userId: number) {
    const podcasts = this.prisma.podcast.findMany({
      where: {
        userId: userId,},
    })
    if (!podcasts) {
      throw new Error('Podcasts not found');
    }
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
    if (!episodes) {
      throw new Error('Episodes not found');
    }
    return episodes
  }

  editUser(userId: number, dto: editUserDto) {
    console.log("userid", userId);
    const user = this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto
      },
    })
    if (!user) {
      throw new Error('User not found');
    }
    return user
  }
  
  async deleteUser(userId: number) {
    const user = this.prisma.user.delete({
      where: {
        id: userId,
      },
      
    })
    if (!user) {
      throw new Error('User not found');
    }
    await this.prisma.podcast.deleteMany({ where: { userId } });
    await this.prisma.episode.deleteMany({ where: { podcast: { userId } } });
    
    return "User deleted successfully"
    //SINCE WE ARE DELETING THE USER, WE HAVE TO DELETE THE PODCASTS AND EPISODES AS WELL
  }
  deleteUserPodcasts(podcastId: number) {
    const podcast = this.prisma.podcast.delete({
      where: {
        id: podcastId,
      },
    })
    if (!podcast) {
      throw new Error('Podcast not found');
    }
    return podcast
  }async deleteUserEpisodes(episodeId: number) {
    try {
      const episode = await this.prisma.episode.delete({
        where: {
          id: episodeId,
        },
      });
      return `Episode with ID ${episode.id} deleted successfully`;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Episode not found');
      }
      // Catch other possible errors
      throw new Error('An error occurred while deleting the episode');
    }
  }  
  editUserPodcasts(podcastId: number, data: any) {
    const podcast = this.prisma.podcast.update({
      where: {
        id: podcastId,
      },
      data,
    })
    if (!podcast) {
      throw new Error('Podcast not found');
    }
    return podcast
  }
  editUserEpisodes(episodeId: number, data: any) {
    const episode = this.prisma.episode.update({
      where: {
        id: episodeId,
      },
      data,
    })
    if (!episode) {
      throw new Error('Episode not found');
    }
    return episode
  }

}
  
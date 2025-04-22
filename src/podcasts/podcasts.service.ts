import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { searchPodcastDto } from './dto/search.dto';
import { contains } from 'class-validator';

@Injectable()
export class PodcastsService {
  constructor(private Prisma: PrismaService) {}

  async displayPodcastPublicByTitle(
    dto: searchPodcastDto,
  ) {
    const { title, username, category } = dto;
    const result = this.Prisma.podcast.findMany({
      where: {
      AND: [
        title
        ? {
          title: {
            contains: title,
            mode: 'insensitive',
          },
          }
        : {},
        username
        ? {
          user: {
            is: {
            username: {
              contains: username,
              mode: 'insensitive',
            },
            },
          },
          }
        : {},
        category
        ? {
          category: {
            name: {
            contains: category,
            mode: 'insensitive',
            },
          },
          }
        : {},
      ],
      },
      include: {
      user: {
        select: {
        username: true,
        },
      },
      category: {
        select: {
        name: true,
        },
      },
      episodes: true,
      },
    });
    if (!result || (await result).length === 0) {
      throw new NotFoundException('Not found try again');
    }
    return result;
  }
}

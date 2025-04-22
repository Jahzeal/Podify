import { Module } from '@nestjs/common';
import { PodcastsController } from './podcasts.controller';
import { PodcastsService } from './podcasts.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PodcastsController],
  providers: [PodcastsService,PrismaService]
})
export class PodcastsModule {}

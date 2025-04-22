import {
  Body,
  Controller,
  Get,
  Param,
  Post
} from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { searchPodcastDto } from './dto/search.dto';

@Controller('podcasts')
export class PodcastsController {
  constructor(
    private readonly podcastService: PodcastsService,
  ) {}

  @Post('search')
  searchPodcats(@Body() dto: searchPodcastDto) {
    return this.podcastService.displayPodcastPublicByTitle(dto)
  }
}

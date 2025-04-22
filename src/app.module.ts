import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PodcastsModule } from './podcasts/podcasts.module';
import { EpisodesModule } from './episodes/episodes.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    CategoriesModule,
    PodcastsModule,
    EpisodesModule,
    PrismaModule,
  ],
})
export class AppModule {}

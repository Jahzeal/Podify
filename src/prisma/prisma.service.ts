import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient{
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    })
  }
}

// This file is used to create a Prisma client instance that can be used throughout the application. It uses the ConfigService to get the database URL from the environment variables.
// The PrismaClient is extended to create a custom PrismaService that can be injected into other services.

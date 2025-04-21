import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module'; // Import PrismaModule here
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service'; // Import PrismaService here


@Module({
  imports: [PrismaModule,JwtModule], // Import PrismaModule here
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy, PrismaService] // Include PrismaService in providers
})
export class AuthModule {}

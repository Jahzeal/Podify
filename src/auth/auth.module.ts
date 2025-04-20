import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module'; // Import PrismaModule here
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [PrismaModule,JwtModule], // Import PrismaModule here
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module'; // Adjust the path if needed


@Module({
  imports: [PrismaModule], // Import PrismaModule here
  controllers: [UsersController],
  providers: [UserService]
})
export class UserModule {}

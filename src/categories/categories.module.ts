import { Module } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CategoryController } from './categories.controller';
import { PrismaModule } from 'src/prisma/prisma.module'; // ✅ Import the module
@Module({
  imports:[PrismaModule],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoriesModule {}

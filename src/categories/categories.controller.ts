import { Controller, Post,Body, Get } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { createCategoryDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guard';
import { UseGuards } from '@nestjs/common/decorators';

@Controller('categories')

export class CategoryController {
  constructor(private categoryService: CategoryService) { }
  // Admin-only
  @Post()
  @UseGuards(JwtAuthGuard) // Optional
  createCategories(@Body() categories: createCategoryDto[]) {
    return this.categoryService.createMany(categories);
  }
  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategory();
  }
}



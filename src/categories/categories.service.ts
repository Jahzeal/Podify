import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createMany(dto: createCategoryDto[]) {
    return this.prisma.category.createMany({
      data: dto,
      skipDuplicates: true,
    });
  }

  async getAllCategory() {
    return this.prisma.category.findMany();
  }
}

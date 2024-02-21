import { Injectable } from '@nestjs/common';
import { Categoria } from '@prisma/client';
import CreateCategoriaDto from 'src/Models/Categoria/CreateCategoriaDto';
import UpdateCategoriaDto from 'src/Models/Categoria/UpdateCategoriaDto';
import { PrismaService } from './prisma.service';

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoriaDto): Promise<Categoria> {
    return this.prisma.categoria.create({ data });
  }

  async update(data: UpdateCategoriaDto, id: bigint): Promise<Categoria> {
    return this.prisma.categoria.update({ where: { id }, data });
  }

  async delete(id: bigint): Promise<Categoria> {
    return this.prisma.categoria.delete({ where: { id } });
  }

  async findAll(): Promise<Categoria[]> {
    return this.prisma.categoria.findMany();
  }

  async findOne(id: bigint): Promise<Categoria> {
    return this.prisma.categoria.findUnique({ where: { id } });
  }
}

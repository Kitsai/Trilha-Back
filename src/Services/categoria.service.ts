import { HttpException, Injectable } from '@nestjs/common';
import Categoria from 'src/Models/Categoria/Categoria';
import CreateCategoriaDto from 'src/Models/Categoria/CreateCategoriaDto';
import UpdateCategoriaDto from 'src/Models/Categoria/UpdateCategoriaDto';
import { PrismaService } from './prisma.service';

@Injectable()
export class CategoriaService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateCategoriaDto): Promise<Categoria> {
        return await this.prisma.categoria.create({ data });
    }

    async update(id: number, data: UpdateCategoriaDto): Promise<Categoria> {
        return await this.prisma.categoria
            .update({ where: { id }, data })
            .catch((e) => {
                if (e.code === 'P2025') {
                    throw new HttpException('Categoria não encontrada', 404);
                }
                throw e;
            });
    }

    async delete(id: number): Promise<Categoria> {
        return await this.prisma.categoria
            .delete({ where: { id } })
            .catch((e) => {
                if (e.code === 'P2025') {
                    throw new HttpException('Categoria não encontrada', 404);
                }
                throw e;
            });
    }

    async findAll(): Promise<Categoria[]> {
        return await this.prisma.categoria.findMany();
    }

    async findOne(id: number): Promise<Categoria> {
        return await this.prisma.categoria
            .findUnique({ where: { id } })
            .catch((e) => {
                if (e.code === 'P2025') {
                    throw new HttpException('Categoria não encontrada', 404);
                }
                throw e;
            });
    }
}

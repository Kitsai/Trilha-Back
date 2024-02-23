import { HttpException, Injectable } from '@nestjs/common';
import CreateTarefaDto from 'src/Models/Tarefa/CreateTarefaDto';
import Tarefa from 'src/Models/Tarefa/Tarefa';
import UpdateTarefaDto from 'src/Models/Tarefa/UpdateTarefaDto';
import { PrismaService } from './prisma.service';

@Injectable()
export class TarefaService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateTarefaDto): Promise<Tarefa> {
        return await this.prisma.tarefa.create({ data }).catch((e) => {
            if (e.code === 'P2025') {
                throw new HttpException('Categoria não encontrada', 404);
            }
            throw e;
        });
    }

    async update(id: number, data: UpdateTarefaDto): Promise<Tarefa> {
        return await this.prisma.tarefa
            .update({ where: { id }, data })
            .catch((e) => {
                if (e.code === 'P2025') {
                    throw new HttpException('Tarefa não encontrada', 404);
                }
                throw e;
            });
    }

    async delete(id: number): Promise<Tarefa> {
        return await this.prisma.tarefa.delete({ where: { id } });
    }

    async findAll(): Promise<Tarefa[]> {
        return await this.prisma.tarefa.findMany();
    }

    async findOne(id: number): Promise<Tarefa> {
        return await this.prisma.tarefa.findUnique({ where: { id } });
    }

    async deleteAllCompleted(): Promise<number> {
        return (
            await this.prisma.tarefa.deleteMany({ where: { isActive: false } })
        ).count;
    }

    async findAllThatApplyActive(active: boolean): Promise<Tarefa[]> {
        return await this.prisma.tarefa.findMany({
            where: { isActive: active },
        });
    }
}

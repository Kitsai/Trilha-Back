import { Injectable } from '@nestjs/common';
import { Tarefa } from '@prisma/client';
import CreateTarefaDto from 'src/Models/Tarefa/CreateTarefaDto';
import UpdateTarefaDto from 'src/Models/Tarefa/UpdateTarefaDto';
import { PrismaService } from './prisma.service';

@Injectable()
export class TarefaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTarefaDto): Promise<Tarefa> {
    try {
      return this.prisma.tarefa.create({ data });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(data: UpdateTarefaDto, id: bigint): Promise<Tarefa> {
    return this.prisma.tarefa.update({ where: { id }, data });
  }

  async delete(id: bigint): Promise<Tarefa> {
    return this.prisma.tarefa.delete({ where: { id } });
  }

  async findAll(): Promise<Tarefa[]> {
    return this.prisma.tarefa.findMany();
  }

  async findOne(id: bigint): Promise<Tarefa> {
    try {
      return this.prisma.tarefa.findUnique({ where: { id } });
    } catch (error) {
      throw new Error(error);
    }
  }
}

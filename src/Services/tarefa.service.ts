import { Injectable } from '@nestjs/common';
import { Tarefa } from '@prisma/client';
import CreateTarefaDto from 'src/Models/Tarefa/CreateTarefaDto';
import UpdateTarefaDto from 'src/Models/Tarefa/UpdateTarefaDto';
import { PrismaService } from './prisma.service';

@Injectable()
export class TarefaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTarefaDto): Promise<Tarefa> {
    return this.prisma.tarefa.create({ data });
  }

  async update(data: UpdateTarefaDto, id: number): Promise<Tarefa> {
    return this.prisma.tarefa.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Tarefa> {
    return this.prisma.tarefa.delete({ where: { id } });
  }

  async findAll(): Promise<Tarefa[]> {
    return this.prisma.tarefa.findMany();
  }

  async findOne(id: number): Promise<Tarefa> {
    return this.prisma.tarefa.findUnique({ where: { id } });
  }
}

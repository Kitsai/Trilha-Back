import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import CreateTarefaDto from 'src/Models/Tarefa/CreateTarefaDto';
import UpdateTarefaDto from 'src/Models/Tarefa/UpdateTarefaDto';
import { BigIntPipe } from 'src/Pipes/bigint.pipe';
import { TarefaService } from 'src/Services/tarefa.service';

@Controller('tarefa')
export class TarefaController {
  constructor(private tarefaService: TarefaService) {}

  @Get()
  async findAll() {
    return this.tarefaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', BigIntPipe) id: bigint) {
    return this.tarefaService.findOne(id);
  }

  @Post()
  async create(@Body() data: CreateTarefaDto) {
    return this.tarefaService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id', BigIntPipe) id: bigint,
    @Body() data: UpdateTarefaDto,
  ) {
    return this.tarefaService.update(data, id);
  }

  @Delete(':id')
  async delete(@Param('id', BigIntPipe) id: bigint) {
    return this.tarefaService.delete(id);
  }
}

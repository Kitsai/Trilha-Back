import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import CreateTarefaDto from 'src/Models/Tarefa/CreateTarefaDto';
import UpdateTarefaDto from 'src/Models/Tarefa/UpdateTarefaDto';
import { CategoriaService } from 'src/Services/categoria.service';
import { TarefaService } from 'src/Services/tarefa.service';

@Controller('tarefa')
export class TarefaController {
    constructor(
        private tarefaService: TarefaService,
        private categoriaService: CategoriaService,
    ) {}

    @Get()
    @HttpCode(200)
    async findAll() {
        return await this.tarefaService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const tarefa = await this.tarefaService.findOne(id);
        if (tarefa) {
            return tarefa;
        } else {
            throw new HttpException('Tarefa não encontrada', 404);
        }
    }

    @Post()
    @HttpCode(201)
    async create(@Body() data: CreateTarefaDto) {
        if (data.nome.length === 0) {
            throw new HttpException('Nome da tarefa é obrigatório', 400);
        }
        try {
            return await this.tarefaService.create(data);
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateTarefaDto,
    ) {
        const tarefaAAtualizar = await this.tarefaService.findOne(id);

        if (!tarefaAAtualizar) {
            throw new HttpException('Tarefa não encontrada', 404);
        }

        tarefaAAtualizar.nome = data.nome;
        tarefaAAtualizar.isActive = data.isActive;

        try {
            const tarefa = await this.tarefaService.update(id, data);
            return tarefa;
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.tarefaService.delete(id);
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }
}

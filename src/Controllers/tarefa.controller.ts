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
    Query,
} from '@nestjs/common';
import CreateTarefaDto from '../Models/Tarefa/CreateTarefaDto';
import ResponseTarefaDto from '../Models/Tarefa/ResponseTarefaDto';
import Tarefa from '../Models/Tarefa/Tarefa';
import UpdateTarefaDto from '../Models/Tarefa/UpdateTarefaDto';
import { CategoriaService } from '../Services/categoria.service';
import { TarefaService } from '../Services/tarefa.service';

@Controller('tarefa')
export class TarefaController {
    constructor(
        private tarefaService: TarefaService,
        private categoriaService: CategoriaService,
    ) {}

    @Get()
    @HttpCode(200)
    async findAll(
        @Query('active') active: string,
        @Query('categoria') categoriaId: string,
    ) {
        if (active !== undefined || categoriaId !== undefined) {
            if (active !== undefined && active !== 'true' && active !== 'false')
                active = undefined;
            const object = {
                isActive: active !== undefined ? active === 'true' : undefined,
                categoriaId:
                    categoriaId !== undefined
                        ? parseInt(categoriaId)
                        : undefined,
            };
            const tarefas = await this.tarefaService.findAllThatApply(object);
            return Promise.all(
                tarefas.map((tarefa) => this.ResponseFromEntity(tarefa)),
            );
        }
        let tarefas = await this.tarefaService.findAll();
        return Promise.all(
            tarefas.map((tarefa) => this.ResponseFromEntity(tarefa)),
        );
    }

    @Get(':id')
    @HttpCode(200)
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const tarefa = await this.tarefaService.findOne(id);
        if (tarefa) {
            return await this.ResponseFromEntity(tarefa);
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
            return this.ResponseFromEntity(
                await this.tarefaService.create(data),
            );
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
            return this.ResponseFromEntity(tarefa);
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.ResponseFromEntity(await this.tarefaService.delete(id));
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    @Delete()
    async deleteAllCompleted() {
        try {
            return await this.tarefaService.deleteAllCompleted();
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    private async ResponseFromEntity(
        entity: Tarefa,
    ): Promise<ResponseTarefaDto> {
        if (entity.categoriaId === null)
            return new ResponseTarefaDto(entity, null);
        let categoria = await this.categoriaService.findOne(entity.categoriaId);
        return new ResponseTarefaDto(entity, categoria);
    }
}

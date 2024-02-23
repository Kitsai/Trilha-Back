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
import Categoria from 'src/Models/Categoria/Categoria';
import CreateCategoriaDto from 'src/Models/Categoria/CreateCategoriaDto';
import UpdateCategoriaDto from 'src/Models/Categoria/UpdateCategoriaDto';
import { CategoriaService } from 'src/Services/categoria.service';

@Controller('categoria')
export class CategoriaController {
    constructor(private categoriaService: CategoriaService) {}

    @Get()
    @HttpCode(200)
    async findAll() {
        return await this.categoriaService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const categoria: Categoria = await this.categoriaService.findOne(id);

        if (categoria) {
            return categoria;
        } else {
            throw new HttpException('Categoria não encontrada', 404);
        }
    }

    @Post()
    @HttpCode(201)
    async create(@Body() data: CreateCategoriaDto) {
        if (data.nome.length === 0) {
            throw new HttpException('Nome da categoria é obrigatório', 400);
        }
        try {
            return await this.categoriaService.create(data);
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    @Patch(':id')
    @HttpCode(200)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateCategoriaDto,
    ) {
        if (data.nome.length === 0) {
            throw new HttpException('Nome da categoria é obrigatório', 400);
        }
        const current: Categoria = await this.categoriaService.findOne(id);
        if (data.nome == current.nome) {
            throw new HttpException('Nome da categoria é igual ao atual', 400);
        }
        try {
            const categoria: Categoria = await this.categoriaService.update(
                id,
                data,
            );
            return categoria;
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    @Delete(':id')
    @HttpCode(200)
    async delete(@Param('id', ParseIntPipe) id: number) {
        try {
            const categoria: Categoria = await this.categoriaService.delete(id);
            return categoria;
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }
}

import { Test } from '@nestjs/testing';
import { Categoria } from '@prisma/client';
import { CategoriaController } from '../src/Controllers/categoria.controller';
import { CategoriaService } from '../src/Services/categoria.service';

describe('Categoria Controller', () => {
    let categoriaController: CategoriaController;
    let categoriaService: CategoriaService;

    let testCategoria: Categoria;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [CategoriaController],
            providers: [CategoriaService],
        }).compile();

        categoriaService = moduleRef.get<CategoriaService>(CategoriaService);
        categoriaController =
            moduleRef.get<CategoriaController>(CategoriaController);
    });

    describe('create', () => {
        it('should create a new categoria', async () => {});
    });
});

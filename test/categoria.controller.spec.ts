import { Categoria } from '@prisma/client';
import { CategoriaController } from '../src/Controllers/categoria.controller';
import { CategoriaService } from '../src/Services/categoria.service';
import { PrismaService } from '../src/Services/prisma.service';

describe('Categoria Controller', () => {
    let categoriaController: CategoriaController;
    let categoriaService: CategoriaService;
    const prismaService = new PrismaService();

    let testCategoria: Categoria;

    beforeEach(async () => {
        categoriaService = new CategoriaService(prismaService);
        categoriaController = new CategoriaController(categoriaService);
    });

    describe('create', () => {
        it('should create a new categoria', async () => {
            const categoriaDto = { nome: 'Teste' };
            testCategoria = await categoriaController.create(categoriaDto);
            expect(testCategoria).toBeDefined();
        });
        it('should have used the name', () => {
            expect(testCategoria.nome).toBe('Teste');
        });
        it('should have an id', () => {
            expect(testCategoria.id).toBeGreaterThan(0);
        });
    });

    describe('findAll', () => {
        it('should return an array of categorias', async () => {
            const result = await categoriaController.findAll();
            expect(result).toBeInstanceOf(Array<Categoria>);
        });
        it('should return an array with lenght > 0', async () => {
            const result = await categoriaController.findAll();
            expect(result.length).toBeGreaterThan(0);
        });
        it('should have the created category', async () => {
            const result = await categoriaController.findAll();
            expect(result).toContainEqual(testCategoria);
        });
    });

    describe('findOne', () => {
        it('should return the created categoria', async () => {
            const categoriaFound = await categoriaController.findOne(
                testCategoria.id,
            );
            expect(categoriaFound).toBeDefined();
            expect(categoriaFound.id).toBe(testCategoria.id);
            expect(categoriaFound.nome).toBe(testCategoria.nome);
        });
    });

    describe('update', () => {
        it('should update the categoria', async () => {
            const updatedCategoria = await categoriaController.update(
                testCategoria.id,
                { nome: 'Teste Update' },
            );
            expect(updatedCategoria).toBeDefined();
            expect(updatedCategoria.id).toBe(testCategoria.id);
            expect(updatedCategoria.nome).toBe('Teste Update');
        });
    });

    describe('delete', () => {
        it('should delete the categoria', async () => {
            const deletedCategoria = await categoriaController.delete(
                testCategoria.id,
            );
            expect(deletedCategoria).toBeDefined();
            expect(deletedCategoria.id).toBe(testCategoria.id);
            expect(deletedCategoria.nome).toBe('Teste Update');
        });
    });
});

import Categoria from '../src/Models/Categoria/Categoria';
import { CategoriaService } from '../src/Services/categoria.service';
import { PrismaService } from '../src/Services/prisma.service';

describe('CategoriaService', () => {
    let prisma: PrismaService;
    let categoriaService: CategoriaService;

    beforeEach(() => {
        prisma = new PrismaService();
        categoriaService = new CategoriaService(prisma);
    });

    describe('findAll', () => {
        it('should return an array of categories', async () => {
            const result = await categoriaService.findAll();
            expect(result).toBeInstanceOf(Array<Categoria>);
        });
        it('should return an array with lenght > 0', async () => {
            const result = await categoriaService.findAll();
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('create & delete', () => {
        it('should create a test category and delete it', async () => {
            const result = await categoriaService.create({ nome: 'Testes' });
            expect(result.nome).toBe('Testes');
            const deleted = await categoriaService.delete(result.id);
            expect(
                deleted.id === result.id && deleted.nome == result.nome,
            ).toBe(true);

            // Clean up
            // await prisma.$queryRaw`ALTER SEQUENCE "Categoria_id_seq" RESTART WITH ${deleted.id - BigInt(1)}`;
        });
    });

    describe('findOne', () => {
        it('should return category 1', async () => {
            const result = await categoriaService.findOne(1);
            expect(result.nome).toBe('Teste');
        });
    });

    describe('update', () => {
        it('should update category 1 to "Teste Update"', async () => {
            const result = await categoriaService.update(1, {
                nome: 'Teste Update',
            });
            expect(result.nome).toBe('Teste Update');
        });
        it('should set it back to "Teste"', async () => {
            const result = await categoriaService.update(1, {
                nome: 'Teste',
            });
            expect(result.nome).toBe('Teste');
        });
    });
});

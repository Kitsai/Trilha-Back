import { TarefaController } from '../src/Controllers/tarefa.controller';
import ResponseTarefaDto from '../src/Models/Tarefa/ResponseTarefaDto';
import { CategoriaService } from '../src/Services/categoria.service';
import { PrismaService } from '../src/Services/prisma.service';
import { TarefaService } from '../src/Services/tarefa.service';

describe('Tarefa Controller', () => {
    let tarefaController: TarefaController;
    let tarefaService: TarefaService;
    const prismaService = new PrismaService();

    let testTarefa: ResponseTarefaDto;

    beforeEach(async () => {
        tarefaService = new TarefaService(prismaService);
        tarefaController = new TarefaController(
            tarefaService,
            new CategoriaService(prismaService),
        );
    });

    describe('create', () => {
        it('should create a new tarefa', async () => {
            const tarefaDto = { nome: 'Teste', categoriaId: 1 };
            testTarefa = await tarefaController.create(tarefaDto);
            expect(testTarefa).toBeDefined();
        });
        it('should have used the name', () => {
            expect(testTarefa.nome).toBe('Teste');
        });
        it('should have an id', () => {
            expect(testTarefa.id).toBeGreaterThan(0);
        });
        it('should be Active', () => {
            expect(testTarefa.isActive).toBe(true);
        });
    });

    describe('findAll', () => {
        it('should return an array of tarefas', async () => {
            const result = await tarefaController.findAll(undefined, undefined);
            expect(result).toBeInstanceOf(Array<ResponseTarefaDto>);
        });
        it('should return an array with lenght > 0', async () => {
            const result = await tarefaController.findAll(undefined, undefined);
            expect(result.length).toBeGreaterThan(0);
        });
        it('should have the created tarefa', async () => {
            const result = await tarefaController.findAll(undefined, undefined);
            expect(result).toContainEqual(testTarefa);
        });
        it('should return an array of tarefas with the active filter', async () => {
            const result = await tarefaController.findAll('true', undefined);
            expect(result).toBeInstanceOf(Array<ResponseTarefaDto>);
            expect(result).toContainEqual(testTarefa);
        });
        it('should return an array of tarefas with the categoria filter', async () => {
            const result = await tarefaController.findAll(undefined, '1');
            expect(result).toBeInstanceOf(Array<ResponseTarefaDto>);
            expect(result).toContainEqual(testTarefa);
        });
        it('should return an array of tarefas with both filters', async () => {
            const result = await tarefaController.findAll('true', '1');
            expect(result).toBeInstanceOf(Array<ResponseTarefaDto>);
            expect(result).toContainEqual(testTarefa);
        });
    });

    describe('findOne', () => {
        it('should return the created tarefa', async () => {
            const tarefaFound = await tarefaController.findOne(testTarefa.id);
            expect(tarefaFound).toBeDefined();
            expect(tarefaFound.id).toBe(testTarefa.id);
            expect(tarefaFound.nome).toBe(testTarefa.nome);
            expect(tarefaFound.isActive).toBe(testTarefa.isActive);
            expect(tarefaFound.categoria.id).toBe(testTarefa.categoria.id);
        });
    });

    describe('update', () => {
        it('should update the tarefa', async () => {
            const updatedTarefa = await tarefaController.update(testTarefa.id, {
                nome: 'Teste Update',
                isActive: false,
            });
            expect(updatedTarefa).toBeDefined();
            expect(updatedTarefa.nome).toBe('Teste Update');
            expect(updatedTarefa.isActive).toBe(false);
            expect(updatedTarefa.id).toBe(testTarefa.id);
            expect(updatedTarefa.categoria.id).toBe(testTarefa.categoria.id);
            testTarefa = updatedTarefa;
        });
    });

    describe('findAll 2', () => {
        it('should return an array of tarefas with the active filter', async () => {
            const result = await tarefaController.findAll('true', undefined);
            expect(result).toBeInstanceOf(Array<ResponseTarefaDto>);
            expect(result).not.toContainEqual(testTarefa);
        });
        it('should return an array of tarefas with the categoria filter', async () => {
            const result = await tarefaController.findAll(undefined, '1');
            expect(result).toBeInstanceOf(Array<ResponseTarefaDto>);
            expect(result).toContainEqual(testTarefa);
        });
        it('should return an array of tarefas with both filters', async () => {
            const result = await tarefaController.findAll('true', '1');
            expect(result).toBeInstanceOf(Array<ResponseTarefaDto>);
            expect(result).not.toContainEqual(testTarefa);
        });
    });

    describe('delete', () => {
        it('should delete the tarefa', async () => {
            const deletedTarefa = await tarefaController.delete(testTarefa.id);
            expect(deletedTarefa).toBeDefined();
            expect(deletedTarefa.id).toBe(testTarefa.id);
            expect(deletedTarefa.nome).toBe('Teste Update');
        });
    });
});

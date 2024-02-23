import CreateTarefaDto from '../src/Models/Tarefa/CreateTarefaDto';
import Tarefa from '../src/Models/Tarefa/Tarefa';
import UpdateTarefaDto from '../src/Models/Tarefa/UpdateTarefaDto';
import { PrismaService } from '../src/Services/prisma.service';
import { TarefaService } from '../src/Services/tarefa.service';

describe('TarefaService', () => {
    let tarefaService: TarefaService;
    let prisma: PrismaService;
    let tarefa: Tarefa;

    beforeEach(() => {
        prisma = new PrismaService();
        tarefaService = new TarefaService(prisma);
    });
    describe('create', () => {
        it('should create a tarefa', async () => {
            const tarefaDto = new CreateTarefaDto('Teste', 1);
            tarefa = await tarefaService.create(tarefaDto);
            expect(tarefa).toBeDefined();
        });
        it('should have used the Dto name', () => {
            expect(tarefa.nome).toBe('Teste');
        });
        it('should have an id', () => {
            expect(tarefa.id).toBeGreaterThan(0);
        });
        it('should be Active', () => {
            expect(tarefa.isActive).toBe(true);
        });
    });

    describe('findAll', () => {
        it('should return an array of tarefas', async () => {
            const result = await tarefaService.findAll();
            expect(result).toBeInstanceOf(Array<Tarefa>);
        });
        it('should return an array with lenght > 0', async () => {
            const result = await tarefaService.findAll();
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('findOne', () => {
        it('should return the created tarefa', async () => {
            const tarefaFound = await tarefaService.findOne(tarefa.id);
            expect(tarefaFound).toBeDefined();
            expect(tarefaFound.id).toBe(tarefa.id);
            expect(tarefaFound.nome).toBe(tarefa.nome);
            expect(tarefaFound.isActive).toBe(tarefa.isActive);
            expect(tarefaFound.categoriaId).toBe(tarefa.categoriaId);
        });
    });

    describe('update', () => {
        it('should update the tarefa', async () => {
            const updatedTarefa = await tarefaService.update(
                tarefa.id,
                new UpdateTarefaDto('Teste Update', false),
            );
            expect(updatedTarefa).toBeDefined();
            expect(updatedTarefa.nome).toBe('Teste Update');
            expect(updatedTarefa.isActive).toBe(false);
            expect(updatedTarefa.id).toBe(tarefa.id);
            expect(updatedTarefa.categoriaId).toBe(tarefa.categoriaId);
        });
        it('should set it back to "Teste"', async () => {
            const updatedTarefa = await tarefaService.update(
                tarefa.id,
                new UpdateTarefaDto('Teste', true),
            );
            expect(updatedTarefa).toBeDefined();
            expect(updatedTarefa.nome).toBe('Teste');
            expect(updatedTarefa.isActive).toBe(true);
            expect(updatedTarefa.id).toBe(tarefa.id);
            expect(updatedTarefa.categoriaId).toBe(tarefa.categoriaId);
        });
    });

    describe('delete', () => {
        it('should delete the tarefa', async () => {
            const deletedTarefa = await tarefaService.delete(tarefa.id);
            expect(deletedTarefa).toBeDefined();
            expect(deletedTarefa.id).toBe(tarefa.id);
            expect(deletedTarefa.nome).toBe(tarefa.nome);
            expect(deletedTarefa.isActive).toBe(tarefa.isActive);
            expect(deletedTarefa.categoriaId).toBe(tarefa.categoriaId);
            expect(await tarefaService.findOne(tarefa.id)).toBeNull();
        });
        //Clean up
        // prisma.$queryRaw`ALTER SEQUENCE "Tarefa_id_seq" RESTART WITH ${tarefa.id - BigInt(1)}`;
    });
});

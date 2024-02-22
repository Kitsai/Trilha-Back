export default class Tarefa {
    public id: bigint;
    public nome: string;
    public isActive: boolean;
    public categoriaId: bigint;
    public createdAt: Date;
    public updatedAt: Date;
}

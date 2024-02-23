import Categoria from '../Categoria/Categoria';
import Tarefa from './Tarefa';

export default class ResponseTarefaDto {
    public id: number;
    public nome: string;
    public isActive: boolean;
    public categoria: Categoria;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(tarefa: Tarefa, categoria: Categoria) {
        this.id = tarefa.id;
        this.nome = tarefa.nome;
        this.isActive = tarefa.isActive;
        this.categoria = categoria;
        this.createdAt = tarefa.createdAt;
        this.updatedAt = tarefa.updatedAt;
    }
}

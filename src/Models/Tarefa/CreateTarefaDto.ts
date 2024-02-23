export default class CreateTarefaDto {
    public nome: string;
    public categoriaId: number;

    constructor(nome: string, categoriaId: number = null) {
        this.nome = nome;
        this.categoriaId = categoriaId;
    }
}

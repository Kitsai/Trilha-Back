export default class CreateTarefaDto {
    public nome: string;
    public categoriaId: bigint;

    constructor(nome: string, categoriaId: bigint = null) {
        this.nome = nome;
        this.categoriaId = categoriaId;
    }
}

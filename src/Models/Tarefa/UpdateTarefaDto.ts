export default class UpdateTarefaDto {
    public nome: string;
    public isActive: boolean;

    constructor(nome: string, isActive: boolean = true) {
        this.nome = nome;
        this.isActive = isActive;
    }
}

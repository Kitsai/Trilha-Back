export default class UpdateTarefaDto {
  nome: string;
  isActive: boolean;
  constructor(nome: string, isActive: boolean) {
    this.nome = nome;
    this.isActive = isActive;
  }
}

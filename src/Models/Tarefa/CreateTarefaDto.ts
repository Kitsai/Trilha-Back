export default class CreateTarefaDto {
  readonly nome: string;
  public categoriaId: bigint;

  constructor(nome: string) {
    this.nome = nome;
  }
}

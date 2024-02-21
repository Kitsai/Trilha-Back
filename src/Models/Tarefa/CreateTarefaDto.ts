export default class CreateTarefaDto {
  nome: string;
  categoriaId: number;

  constructor(nome: string, categoriaId: number) {
    this.nome = nome;
    this.categoriaId = categoriaId;
  }
}

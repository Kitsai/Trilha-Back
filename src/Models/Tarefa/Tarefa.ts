import Categoria from '../Categoria/Categoria';

export default class Tarefa {
  id: bigint;
  nome: string;
  isActive: boolean;
  categoriaId: Categoria;
  createdAt: Date;
  updatedAt: Date;
}

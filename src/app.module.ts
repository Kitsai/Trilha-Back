import { Module } from '@nestjs/common';
import { CategoriaController } from './Controllers/categoria.controller';
import { TarefaController } from './Controllers/tarefa.controller';
import { CategoriaService } from './Services/categoria.service';
import { TarefaService } from './Services/tarefa.service';

@Module({
  imports: [],
  controllers: [TarefaController, CategoriaController],
  providers: [TarefaService, CategoriaService],
})
export class AppModule {}

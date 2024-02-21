/*
  Warnings:

  - You are about to drop the `CategoriaEntity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TarefaEntity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TarefaEntity" DROP CONSTRAINT "TarefaEntity_categoriaId_fkey";

-- DropTable
DROP TABLE "CategoriaEntity";

-- DropTable
DROP TABLE "TarefaEntity";

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" BIGSERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "categoriaId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" BIGSERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

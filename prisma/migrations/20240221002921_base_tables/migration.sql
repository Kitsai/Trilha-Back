-- CreateTable
CREATE TABLE "TarefaEntity" (
    "id" BIGSERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "categoriaId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TarefaEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaEntity" (
    "id" BIGSERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategoriaEntity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoriaEntity_nome_key" ON "CategoriaEntity"("nome");

-- AddForeignKey
ALTER TABLE "TarefaEntity" ADD CONSTRAINT "TarefaEntity_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaEntity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Nivel" (
    "id" SERIAL NOT NULL,
    "nivel" TEXT NOT NULL,

    CONSTRAINT "Nivel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Desenvolvedor" (
    "id" SERIAL NOT NULL,
    "nivel_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "sexo" CHAR(1) NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "hobby" TEXT NOT NULL,

    CONSTRAINT "Desenvolvedor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nivel_nivel_key" ON "Nivel"("nivel");

-- AddForeignKey
ALTER TABLE "Desenvolvedor" ADD CONSTRAINT "Desenvolvedor_nivel_id_fkey" FOREIGN KEY ("nivel_id") REFERENCES "Nivel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "animes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "episodios" INTEGER NOT NULL,

    CONSTRAINT "animes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

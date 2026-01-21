/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Uso" AS ENUM ('VACA', 'VAQUILLONA');

-- CreateEnum
CREATE TYPE "Origen" AS ENUM ('PROPIO', 'CATALOGO');

-- CreateEnum
CREATE TYPE "Pelaje" AS ENUM ('NEGRO', 'COLORADO');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "updatedAt",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Favorite" (
    "userId" TEXT NOT NULL,
    "bullId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("userId","bullId")
);

-- CreateTable
CREATE TABLE "Bull" (
    "id" TEXT NOT NULL,
    "caravana" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "uso" "Uso" NOT NULL,
    "origen" "Origen" NOT NULL,
    "pelaje" "Pelaje" NOT NULL,
    "raza" TEXT NOT NULL,
    "edadMeses" INTEGER NOT NULL,
    "caracteristicaDestacada" TEXT,
    "crecimiento" INTEGER NOT NULL,
    "facilidadParto" INTEGER NOT NULL,
    "reproduccion" INTEGER NOT NULL,
    "moderacion" INTEGER NOT NULL,
    "carcasa" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bull_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bull_caravana_key" ON "Bull"("caravana");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_bullId_fkey" FOREIGN KEY ("bullId") REFERENCES "Bull"("id") ON DELETE CASCADE ON UPDATE CASCADE;

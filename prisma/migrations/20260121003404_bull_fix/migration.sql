/*
  Warnings:

  - Added the required column `edad_meses` to the `Bull` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bull" ADD COLUMN     "edad_meses" INTEGER NOT NULL;

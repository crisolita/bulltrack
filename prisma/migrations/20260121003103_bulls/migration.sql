/*
  Warnings:

  - The values [PROPIO,CATALOGO] on the enum `Origen` will be removed. If these variants are still used in the database, this will fail.
  - The values [NEGRO,COLORADO] on the enum `Pelaje` will be removed. If these variants are still used in the database, this will fail.
  - The values [VACA,VAQUILLONA] on the enum `Uso` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `updateAt` to the `Bull` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Origen_new" AS ENUM ('propio', 'catalogo');
ALTER TABLE "Bull" ALTER COLUMN "origen" TYPE "Origen_new" USING ("origen"::text::"Origen_new");
ALTER TYPE "Origen" RENAME TO "Origen_old";
ALTER TYPE "Origen_new" RENAME TO "Origen";
DROP TYPE "public"."Origen_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Pelaje_new" AS ENUM ('negro', 'colorado');
ALTER TABLE "Bull" ALTER COLUMN "pelaje" TYPE "Pelaje_new" USING ("pelaje"::text::"Pelaje_new");
ALTER TYPE "Pelaje" RENAME TO "Pelaje_old";
ALTER TYPE "Pelaje_new" RENAME TO "Pelaje";
DROP TYPE "public"."Pelaje_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Uso_new" AS ENUM ('vaca', 'vaquillona');
ALTER TABLE "Bull" ALTER COLUMN "uso" TYPE "Uso_new" USING ("uso"::text::"Uso_new");
ALTER TYPE "Uso" RENAME TO "Uso_old";
ALTER TYPE "Uso_new" RENAME TO "Uso";
DROP TYPE "public"."Uso_old";
COMMIT;

-- AlterTable
ALTER TABLE "Bull" ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

/*
  Warnings:

  - You are about to alter the column `sum` on the `TopUpOperations` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "TopUpOperations" ALTER COLUMN "sum" SET DATA TYPE INTEGER;

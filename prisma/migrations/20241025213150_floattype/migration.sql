/*
  Warnings:

  - You are about to alter the column `balance` on the `Deposits` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `totalAmount` on the `Referrals` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `sum` on the `TopUpDeclined` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `sum` on the `TopUpOperations` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `sum` on the `TopUpRequest` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `sum` on the `WithdrawDeclined` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `sum` on the `WithdrawOperations` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `amount` on the `WithdrawRequest` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Deposits" ALTER COLUMN "balance" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Referrals" ALTER COLUMN "totalAmount" SET DEFAULT 0,
ALTER COLUMN "totalAmount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "TopUpDeclined" ALTER COLUMN "sum" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "TopUpOperations" ALTER COLUMN "sum" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "TopUpRequest" ALTER COLUMN "sum" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "WithdrawDeclined" ALTER COLUMN "sum" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "WithdrawOperations" ALTER COLUMN "sum" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "WithdrawRequest" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

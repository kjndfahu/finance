/*
  Warnings:

  - You are about to drop the column `userId` on the `TopUpOperations` table. All the data in the column will be lost.
  - You are about to drop the column `operationhistoryId` on the `WithdrawOperations` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `WithdrawOperations` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `WithdrawRequest` table. All the data in the column will be lost.
  - Changed the type of `status` on the `Deposits` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `typeofline` to the `Referrals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `TopUpOperations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `WithdrawOperations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `WithdrawRequest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WithdrawStatus" AS ENUM ('APPROVED', 'INPROCESSING', 'REJECTED');

-- DropForeignKey
ALTER TABLE "Deposits" DROP CONSTRAINT "Deposits_login_balance_fkey";

-- DropForeignKey
ALTER TABLE "TopUpOperations" DROP CONSTRAINT "TopUpOperations_userId_fkey";

-- DropForeignKey
ALTER TABLE "WithdrawOperations" DROP CONSTRAINT "WithdrawOperations_operationhistoryId_fkey";

-- DropForeignKey
ALTER TABLE "WithdrawOperations" DROP CONSTRAINT "WithdrawOperations_userId_fkey";

-- DropForeignKey
ALTER TABLE "WithdrawRequest" DROP CONSTRAINT "WithdrawRequest_login_fkey";

-- DropIndex
DROP INDEX "Deposits_login_balance_key";

-- DropIndex
DROP INDEX "Referrals_userId_key";

-- AlterTable
ALTER TABLE "Deposits" ADD COLUMN     "userId" INTEGER,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Referrals" ADD COLUMN     "referredBy" INTEGER,
ADD COLUMN     "typeofline" INTEGER NOT NULL,
ALTER COLUMN "totalProfit" SET DEFAULT 0,
ALTER COLUMN "totalProfit" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "TopUpOperations" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "status" "WithdrawStatus" NOT NULL DEFAULT 'APPROVED';

-- AlterTable
ALTER TABLE "TopUpRequest" ADD COLUMN     "status" "WithdrawStatus" NOT NULL DEFAULT 'INPROCESSING';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "region" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "WithdrawOperations" DROP COLUMN "operationhistoryId",
DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "operationsHistoryId" INTEGER,
ADD COLUMN     "status" "WithdrawStatus" NOT NULL DEFAULT 'APPROVED';

-- AlterTable
ALTER TABLE "WithdrawRequest" DROP COLUMN "login",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "status" "WithdrawStatus" NOT NULL DEFAULT 'INPROCESSING';

-- CreateTable
CREATE TABLE "WithdrawDeclined" (
    "id" SERIAL NOT NULL,
    "sum" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "status" "WithdrawStatus" NOT NULL DEFAULT 'REJECTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "operationsHistoryId" INTEGER,

    CONSTRAINT "WithdrawDeclined_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopUpDeclined" (
    "id" SERIAL NOT NULL,
    "sum" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "status" "WithdrawStatus" NOT NULL DEFAULT 'REJECTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "operationsHistoryId" INTEGER,

    CONSTRAINT "TopUpDeclined_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TopUpOperations" ADD CONSTRAINT "TopUpOperations_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WithdrawOperations" ADD CONSTRAINT "WithdrawOperations_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WithdrawOperations" ADD CONSTRAINT "WithdrawOperations_operationsHistoryId_fkey" FOREIGN KEY ("operationsHistoryId") REFERENCES "OperationsHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WithdrawDeclined" ADD CONSTRAINT "WithdrawDeclined_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WithdrawDeclined" ADD CONSTRAINT "WithdrawDeclined_operationsHistoryId_fkey" FOREIGN KEY ("operationsHistoryId") REFERENCES "OperationsHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopUpDeclined" ADD CONSTRAINT "TopUpDeclined_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopUpDeclined" ADD CONSTRAINT "TopUpDeclined_operationsHistoryId_fkey" FOREIGN KEY ("operationsHistoryId") REFERENCES "OperationsHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deposits" ADD CONSTRAINT "Deposits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WithdrawRequest" ADD CONSTRAINT "WithdrawRequest_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `name` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastread` to the `Chatmember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Chatmember` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClientStatus" AS ENUM ('INCHATGROUP', 'OFFLINE');

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Chatmember" ADD COLUMN     "lastread" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "ClientStatus" NOT NULL;

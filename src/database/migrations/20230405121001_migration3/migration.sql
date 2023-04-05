/*
  Warnings:

  - You are about to drop the column `ownerId` on the `ChatMessage` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_ownerId_fkey";

-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "ownerId",
ADD COLUMN     "clientId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

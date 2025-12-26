/*
  Warnings:

  - You are about to drop the column `compressesSize` on the `Video` table. All the data in the column will be lost.
  - Added the required column `compressedSize` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "compressesSize",
ADD COLUMN     "compressedSize" TEXT NOT NULL;

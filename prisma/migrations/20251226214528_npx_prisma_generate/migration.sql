/*
  Warnings:

  - You are about to drop the column `compressedSize` on the `Video` table. All the data in the column will be lost.
  - Added the required column `compresedSize` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `originalSize` on the `Video` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `duration` on the `Video` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "compressedSize",
ADD COLUMN     "compresedSize" INTEGER NOT NULL,
DROP COLUMN "originalSize",
ADD COLUMN     "originalSize" INTEGER NOT NULL,
DROP COLUMN "duration",
ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL;

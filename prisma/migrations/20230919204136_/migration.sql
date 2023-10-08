/*
  Warnings:

  - You are about to drop the column `designamtion` on the `faculties` table. All the data in the column will be lost.
  - Added the required column `designation` to the `faculties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "faculties" DROP COLUMN "designamtion",
ADD COLUMN     "designation" TEXT NOT NULL;

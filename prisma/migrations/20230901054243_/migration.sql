/*
  Warnings:

  - You are about to drop the column `courseIds` on the `offered_courses` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `offered_courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "offered_courses" DROP CONSTRAINT "offered_courses_courseIds_fkey";

-- AlterTable
ALTER TABLE "offered_courses" DROP COLUMN "courseIds",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "offered_courses" ADD CONSTRAINT "offered_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

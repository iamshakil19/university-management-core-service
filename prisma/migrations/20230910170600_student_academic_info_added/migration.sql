/*
  Warnings:

  - The `status` column on the `student_enrolled_courses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StudentEnrolledCourseStatus" AS ENUM ('ONGOING', 'COMPLETED', 'WITHDRAWN');

-- AlterTable
ALTER TABLE "student_enrolled_courses" DROP COLUMN "status",
ADD COLUMN     "status" "StudentEnrolledCourseStatus" DEFAULT 'ONGOING';

-- DropEnum
DROP TYPE "studentEnrolledCourseStatus";

-- CreateTable
CREATE TABLE "student_academic_infos" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "totalCompletedCredit" INTEGER DEFAULT 0,
    "cgpa" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "student_academic_infos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_academic_infos" ADD CONSTRAINT "student_academic_infos_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT true;

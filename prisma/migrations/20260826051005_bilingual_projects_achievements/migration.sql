-- Achievement: add bilingual title/description, backfill from the old
-- single-language columns, then drop them.
ALTER TABLE "Achievement" ADD COLUMN "titleEn" TEXT;
ALTER TABLE "Achievement" ADD COLUMN "titleId" TEXT;
ALTER TABLE "Achievement" ADD COLUMN "descriptionEn" TEXT;
ALTER TABLE "Achievement" ADD COLUMN "descriptionId" TEXT;

UPDATE "Achievement" SET
  "titleEn" = "title",
  "titleId" = "title",
  "descriptionEn" = "description",
  "descriptionId" = "description";

ALTER TABLE "Achievement" ALTER COLUMN "titleEn" SET NOT NULL;
ALTER TABLE "Achievement" ALTER COLUMN "titleId" SET NOT NULL;

ALTER TABLE "Achievement" DROP COLUMN "title";
ALTER TABLE "Achievement" DROP COLUMN "description";

-- Project: add bilingual title/description/content, backfill, drop old.
ALTER TABLE "Project" ADD COLUMN "titleEn" TEXT;
ALTER TABLE "Project" ADD COLUMN "titleId" TEXT;
ALTER TABLE "Project" ADD COLUMN "descriptionEn" TEXT;
ALTER TABLE "Project" ADD COLUMN "descriptionId" TEXT;
ALTER TABLE "Project" ADD COLUMN "contentEn" TEXT;
ALTER TABLE "Project" ADD COLUMN "contentId" TEXT;

UPDATE "Project" SET
  "titleEn" = "title",
  "titleId" = "title",
  "descriptionEn" = "description",
  "descriptionId" = "description",
  "contentEn" = "content",
  "contentId" = "content";

ALTER TABLE "Project" ALTER COLUMN "titleEn" SET NOT NULL;
ALTER TABLE "Project" ALTER COLUMN "titleId" SET NOT NULL;
ALTER TABLE "Project" ALTER COLUMN "descriptionEn" SET NOT NULL;
ALTER TABLE "Project" ALTER COLUMN "descriptionId" SET NOT NULL;
ALTER TABLE "Project" ALTER COLUMN "contentEn" SET NOT NULL;
ALTER TABLE "Project" ALTER COLUMN "contentId" SET NOT NULL;

ALTER TABLE "Project" DROP COLUMN "title";
ALTER TABLE "Project" DROP COLUMN "description";
ALTER TABLE "Project" DROP COLUMN "content";

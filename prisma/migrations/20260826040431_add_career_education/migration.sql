-- CreateTable
CREATE TABLE "Career" (
    "id" TEXT NOT NULL,
    "positionEn" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "companyLogoUrl" TEXT,
    "employmentTypeEn" TEXT NOT NULL,
    "employmentTypeId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "responsibilitiesEn" TEXT NOT NULL,
    "responsibilitiesId" TEXT NOT NULL,
    "learnedEn" TEXT NOT NULL,
    "learnedId" TEXT NOT NULL,
    "impactEn" TEXT NOT NULL,
    "impactId" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "degreeEn" TEXT NOT NULL,
    "degreeId" TEXT NOT NULL,
    "gpaEn" TEXT,
    "gpaId" TEXT,
    "location" TEXT NOT NULL,
    "logoUrl" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "thesisLabelEn" TEXT,
    "thesisLabelId" TEXT,
    "thesisProjectTitleEn" TEXT,
    "thesisProjectTitleId" TEXT,
    "thesisDetailsEn" TEXT,
    "thesisDetailsId" TEXT,
    "thesisProjectSlug" TEXT,
    "thesisJournalUrl" TEXT,
    "thesisJournalLabelEn" TEXT,
    "thesisJournalLabelId" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Career_isPublished_idx" ON "Career"("isPublished");

-- CreateIndex
CREATE INDEX "Career_startDate_idx" ON "Career"("startDate");

-- CreateIndex
CREATE INDEX "Education_isPublished_idx" ON "Education"("isPublished");

-- CreateIndex
CREATE INDEX "Education_startDate_idx" ON "Education"("startDate");

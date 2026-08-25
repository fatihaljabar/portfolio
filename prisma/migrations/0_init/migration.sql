-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."AchievementType" AS ENUM ('PROFESSIONAL', 'ACADEMIC', 'COURSE', 'BOOTCAMP', 'CERTIFICATION');

-- CreateTable
CREATE TABLE "public"."Achievement" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "issuer" TEXT NOT NULL,
    "certificateNumber" TEXT,
    "credentialUrl" TEXT,
    "imageUrl" TEXT,
    "issuedDate" TIMESTAMP(3) NOT NULL,
    "type" "public"."AchievementType" NOT NULL,
    "category" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "additionalImages" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Love" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Love_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LoveAnalytics" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT,
    "referrer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoveAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "githubUrl" TEXT,
    "demoUrl" TEXT,
    "techStack" TEXT[],
    "category" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Achievement_category_idx" ON "public"."Achievement"("category" ASC);

-- CreateIndex
CREATE INDEX "Achievement_slug_idx" ON "public"."Achievement"("slug" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_slug_key" ON "public"."Achievement"("slug" ASC);

-- CreateIndex
CREATE INDEX "Achievement_type_idx" ON "public"."Achievement"("type" ASC);

-- CreateIndex
CREATE INDEX "Love_ipAddress_idx" ON "public"."Love"("ipAddress" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Love_ipAddress_key" ON "public"."Love"("ipAddress" ASC);

-- CreateIndex
CREATE INDEX "LoveAnalytics_createdAt_idx" ON "public"."LoveAnalytics"("createdAt" ASC);

-- CreateIndex
CREATE INDEX "Message_createdAt_idx" ON "public"."Message"("createdAt" ASC);

-- CreateIndex
CREATE INDEX "Project_category_idx" ON "public"."Project"("category" ASC);

-- CreateIndex
CREATE INDEX "Project_isFeatured_idx" ON "public"."Project"("isFeatured" ASC);

-- CreateIndex
CREATE INDEX "Project_slug_idx" ON "public"."Project"("slug" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "public"."Project"("slug" ASC);


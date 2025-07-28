/*
  Warnings:

  - Added the required column `cover_page` to the `Articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Articles" ADD COLUMN     "cover_page" TEXT NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

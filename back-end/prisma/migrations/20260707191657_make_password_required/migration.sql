/*
  Warnings:

  - Made the column `cep` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cep" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL;

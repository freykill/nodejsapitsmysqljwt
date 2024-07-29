/*
  Warnings:

  - Made the column `usuario` on table `auth` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `auth` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `auth` MODIFY `usuario` VARCHAR(45) NOT NULL,
    MODIFY `password` VARCHAR(200) NOT NULL;

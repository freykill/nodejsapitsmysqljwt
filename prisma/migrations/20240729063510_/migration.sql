/*
  Warnings:

  - A unique constraint covering the columns `[usuario]` on the table `auth` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `auth_usuario_key` ON `auth`(`usuario`);

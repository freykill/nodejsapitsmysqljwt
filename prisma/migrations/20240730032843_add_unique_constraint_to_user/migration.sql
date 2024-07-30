/*
  Warnings:

  - A unique constraint covering the columns `[user]` on the table `Login` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Login_user_key` ON `Login`(`user`);

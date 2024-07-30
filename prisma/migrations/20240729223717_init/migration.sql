/*
  Warnings:

  - You are about to drop the `atenciones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `citas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servicio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `atenciones` DROP FOREIGN KEY `atenciones_ibfk_1`;

-- DropForeignKey
ALTER TABLE `atenciones` DROP FOREIGN KEY `atenciones_ibfk_2`;

-- DropTable
DROP TABLE `atenciones`;

-- DropTable
DROP TABLE `auth`;

-- DropTable
DROP TABLE `citas`;

-- DropTable
DROP TABLE `clientes`;

-- DropTable
DROP TABLE `servicio`;

-- DropTable
DROP TABLE `usuarios`;

-- CreateTable
CREATE TABLE `Login` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clientes` (
    `id_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `celular` VARCHAR(15) NOT NULL,
    `email` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Citas` (
    `id_cita` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `estado` VARCHAR(20) NOT NULL,
    `fecha` DATE NOT NULL,
    `hora` TIME NOT NULL,
    `id_servicio` INTEGER NOT NULL,

    PRIMARY KEY (`id_cita`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servicio` (
    `id_servicio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id_servicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Citas` ADD CONSTRAINT `Citas_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `Clientes`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Citas` ADD CONSTRAINT `Citas_id_servicio_fkey` FOREIGN KEY (`id_servicio`) REFERENCES `Servicio`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

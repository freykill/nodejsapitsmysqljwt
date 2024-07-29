-- CreateTable
CREATE TABLE `atenciones` (
    `id_ticket` INTEGER NOT NULL,
    `id_cita` INTEGER NULL,
    `id_servicio` INTEGER NULL,
    `fecha_atencion` DATE NULL,
    `detalle` TEXT NULL,

    INDEX `id_cita`(`id_cita`),
    INDEX `id_servicio`(`id_servicio`),
    PRIMARY KEY (`id_ticket`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth` (
    `id` INTEGER NOT NULL,
    `usuario` VARCHAR(45) NULL,
    `password` VARCHAR(200) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `citas` (
    `id_cita` INTEGER NOT NULL,
    `id_cliente` INTEGER NULL,
    `estado` VARCHAR(20) NULL,
    `fecha` DATE NULL,
    `hora` TIME(0) NULL,

    INDEX `id_cliente`(`id_cliente`),
    PRIMARY KEY (`id_cita`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NULL,
    `celular` VARCHAR(15) NULL,
    `email` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servicio` (
    `id` INTEGER NOT NULL,
    `nombre` VARCHAR(50) NULL,
    `descripcion` TEXT NULL,
    `precio` DECIMAL(10, 2) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NULL,
    `activo` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `atenciones` ADD CONSTRAINT `atenciones_ibfk_1` FOREIGN KEY (`id_servicio`) REFERENCES `servicio`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `atenciones` ADD CONSTRAINT `atenciones_ibfk_2` FOREIGN KEY (`id_cita`) REFERENCES `citas`(`id_cita`) ON DELETE NO ACTION ON UPDATE NO ACTION;

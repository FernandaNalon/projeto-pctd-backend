/*
  Warnings:

  - You are about to drop the `observacao_pedagogica` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `observacao_pedagogica` DROP FOREIGN KEY `observacao_pedagogica_aluno_id_fkey`;

-- DropForeignKey
ALTER TABLE `observacao_pedagogica` DROP FOREIGN KEY `observacao_pedagogica_docente_id_fkey`;

-- DropForeignKey
ALTER TABLE `observacao_pedagogica` DROP FOREIGN KEY `observacao_pedagogica_turma_id_fkey`;

-- DropTable
DROP TABLE `observacao_pedagogica`;

-- CreateTable
CREATE TABLE `registro_interno` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `titulo` VARCHAR(180) NOT NULL,
    `descricao` TEXT NOT NULL,
    `categoria` ENUM('PEDAGOGICA', 'COMUNICADO', 'ACOMPANHAMENTO') NOT NULL DEFAULT 'PEDAGOGICA',
    `prioridade` ENUM('BAIXA', 'MEDIA', 'ALTA') NOT NULL DEFAULT 'MEDIA',
    `status` ENUM('ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO') NOT NULL DEFAULT 'ABERTO',
    `data` DATE NOT NULL,
    `turma_id` CHAR(36) NULL,
    `aluno_id` CHAR(36) NULL,
    `autor_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `registro_interno_turma_id_idx`(`turma_id`),
    INDEX `registro_interno_aluno_id_idx`(`aluno_id`),
    INDEX `registro_interno_autor_id_idx`(`autor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `registro_comentario` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `comentario` TEXT NOT NULL,
    `registro_id` CHAR(36) NOT NULL,
    `usuario_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `registro_comentario_registro_id_idx`(`registro_id`),
    INDEX `registro_comentario_usuario_id_idx`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `registro_interno` ADD CONSTRAINT `registro_interno_turma_id_fkey` FOREIGN KEY (`turma_id`) REFERENCES `turma`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `registro_interno` ADD CONSTRAINT `registro_interno_aluno_id_fkey` FOREIGN KEY (`aluno_id`) REFERENCES `aluno`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `registro_interno` ADD CONSTRAINT `registro_interno_autor_id_fkey` FOREIGN KEY (`autor_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `registro_comentario` ADD CONSTRAINT `registro_comentario_registro_id_fkey` FOREIGN KEY (`registro_id`) REFERENCES `registro_interno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `registro_comentario` ADD CONSTRAINT `registro_comentario_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

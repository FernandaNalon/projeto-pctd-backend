-- CreateTable
CREATE TABLE `user` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `nome` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `senha_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'COORDENACAO', 'DOCENTE') NOT NULL DEFAULT 'DOCENTE',
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `foto_perfil` VARCHAR(255) NULL,
    `ultimo_login` DATETIME(0) NULL,
    `refresh_token` TEXT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `turma` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `nome` VARCHAR(150) NOT NULL,
    `periodo` ENUM('MANHA', 'TARDE', 'NOITE') NOT NULL,
    `curso` VARCHAR(150) NOT NULL,
    `ano_letivo` INTEGER NULL,
    `semestre` INTEGER NULL,
    `data_inicio` DATE NOT NULL,
    `data_fim` DATE NULL,
    `status` ENUM('ATIVA', 'ENCERRADA', 'CANCELADA') NOT NULL DEFAULT 'ATIVA',
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aluno` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `id_interno` VARCHAR(50) NULL,
    `nome_completo` VARCHAR(180) NOT NULL,
    `email` VARCHAR(150) NULL,
    `telefone` VARCHAR(30) NULL,
    `status` ENUM('ATIVO', 'EVADIDO', 'TRANSFERIDO', 'CONCLUIDO') NOT NULL DEFAULT 'ATIVO',
    `turma_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    UNIQUE INDEX `aluno_id_interno_key`(`id_interno`),
    UNIQUE INDEX `aluno_email_key`(`email`),
    INDEX `aluno_turma_id_idx`(`turma_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unidade_curricular` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `nome` VARCHAR(180) NOT NULL,
    `carga_horaria` INTEGER NOT NULL,
    `quant_aulas` INTEGER NOT NULL,
    `ordem` INTEGER NULL,
    `data_inicio` DATE NULL,
    `data_fim` DATE NULL,
    `turma_id` CHAR(36) NOT NULL,
    `docente_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `unidade_curricular_turma_id_idx`(`turma_id`),
    INDEX `unidade_curricular_docente_id_idx`(`docente_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aula` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `data` DATE NOT NULL,
    `numero_aula` INTEGER NOT NULL,
    `tema` VARCHAR(200) NOT NULL,
    `conteudo_desenvolvido` TEXT NOT NULL,
    `atividades_realizadas` TEXT NULL,
    `observacoes` TEXT NULL,
    `uc_id` CHAR(36) NOT NULL,
    `docente_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `aula_uc_id_idx`(`uc_id`),
    INDEX `aula_docente_id_idx`(`docente_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `indicador` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `descricao` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aula_indicador` (
    `aula_id` CHAR(36) NOT NULL,
    `indicador_id` CHAR(36) NOT NULL,

    INDEX `aula_indicador_indicador_id_idx`(`indicador_id`),
    PRIMARY KEY (`aula_id`, `indicador_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `observacao_pedagogica` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `titulo` VARCHAR(180) NOT NULL,
    `descricao` TEXT NOT NULL,
    `categoria` ENUM('PEDAGOGICA', 'COMUNICADO', 'ACOMPANHAMENTO') NOT NULL DEFAULT 'PEDAGOGICA',
    `prioridade` ENUM('BAIXA', 'MEDIA', 'ALTA') NOT NULL DEFAULT 'MEDIA',
    `status` ENUM('ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO') NOT NULL DEFAULT 'ABERTO',
    `data` DATE NOT NULL,
    `turma_id` CHAR(36) NULL,
    `aluno_id` CHAR(36) NULL,
    `docente_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `observacao_pedagogica_turma_id_idx`(`turma_id`),
    INDEX `observacao_pedagogica_aluno_id_idx`(`aluno_id`),
    INDEX `observacao_pedagogica_docente_id_idx`(`docente_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_log` (
    `id` CHAR(36) NOT NULL DEFAULT (uuid()),
    `user_id` CHAR(36) NOT NULL,
    `action` ENUM('CRIACAO', 'ATUALIZACAO', 'EXCLUSAO', 'LOGIN', 'LOGOUT') NOT NULL,
    `entidade` VARCHAR(100) NOT NULL,
    `entidade_id` CHAR(36) NOT NULL,
    `dados_antigos` LONGTEXT NULL,
    `dados_novos` LONGTEXT NULL,
    `ip_address` VARCHAR(80) NULL,
    `user_agent` TEXT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `audit_log_user_id_idx`(`user_id`),
    INDEX `audit_log_created_at_idx`(`created_at`),
    INDEX `audit_log_entidade_entidade_id_idx`(`entidade`, `entidade_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `aluno` ADD CONSTRAINT `aluno_turma_id_fkey` FOREIGN KEY (`turma_id`) REFERENCES `turma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unidade_curricular` ADD CONSTRAINT `unidade_curricular_turma_id_fkey` FOREIGN KEY (`turma_id`) REFERENCES `turma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unidade_curricular` ADD CONSTRAINT `unidade_curricular_docente_id_fkey` FOREIGN KEY (`docente_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aula` ADD CONSTRAINT `aula_uc_id_fkey` FOREIGN KEY (`uc_id`) REFERENCES `unidade_curricular`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aula` ADD CONSTRAINT `aula_docente_id_fkey` FOREIGN KEY (`docente_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aula_indicador` ADD CONSTRAINT `aula_indicador_aula_id_fkey` FOREIGN KEY (`aula_id`) REFERENCES `aula`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aula_indicador` ADD CONSTRAINT `aula_indicador_indicador_id_fkey` FOREIGN KEY (`indicador_id`) REFERENCES `indicador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `observacao_pedagogica` ADD CONSTRAINT `observacao_pedagogica_turma_id_fkey` FOREIGN KEY (`turma_id`) REFERENCES `turma`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `observacao_pedagogica` ADD CONSTRAINT `observacao_pedagogica_aluno_id_fkey` FOREIGN KEY (`aluno_id`) REFERENCES `aluno`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `observacao_pedagogica` ADD CONSTRAINT `observacao_pedagogica_docente_id_fkey` FOREIGN KEY (`docente_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_log` ADD CONSTRAINT `audit_log_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

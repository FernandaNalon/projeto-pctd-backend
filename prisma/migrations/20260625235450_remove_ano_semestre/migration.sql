/*
  Warnings:

  - You are about to drop the column `ano_letivo` on the `turma` table. All the data in the column will be lost.
  - You are about to drop the column `semestre` on the `turma` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `turma` DROP COLUMN `ano_letivo`,
    DROP COLUMN `semestre`;

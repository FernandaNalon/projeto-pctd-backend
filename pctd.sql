CREATE DATABASE IF NOT EXISTS pctd
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE pctd;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS aula_indicadores;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS observacoes_pedagogicas;
DROP TABLE IF EXISTS indicadores;
DROP TABLE IF EXISTS aulas;
DROP TABLE IF EXISTS unidades_curriculares;
DROP TABLE IF EXISTS representantes_turma;
DROP TABLE IF EXISTS acordos_convivencia;
DROP TABLE IF EXISTS turma_docentes;
DROP TABLE IF EXISTS alunos;
DROP TABLE IF EXISTS docentes;
DROP TABLE IF EXISTS turmas;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

-- Usuários do sistema
CREATE TABLE users (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  role ENUM('ADMIN', 'COORDENACAO', 'DOCENTE') NOT NULL DEFAULT 'DOCENTE',
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  refresh_token TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL
);

-- Docentes
CREATE TABLE docentes (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  telefone VARCHAR(30) NULL,
  cargo VARCHAR(100) NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  user_id CHAR(36) NOT NULL UNIQUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_docentes_users FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Turmas
CREATE TABLE turmas (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nome VARCHAR(150) NOT NULL,
  periodo ENUM('MANHA', 'TARDE', 'NOITE') NOT NULL,
  curso VARCHAR(150) NOT NULL,
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  status ENUM('ATIVA', 'ENCERRADA', 'CANCELADA') NOT NULL DEFAULT 'ATIVA',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL
);

-- Vínculo entre turmas e docentes
CREATE TABLE turma_docentes (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  turma_id CHAR(36) NOT NULL,
  docente_id CHAR(36) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_turma_docentes_turmas FOREIGN KEY (turma_id) REFERENCES turmas(id),
  CONSTRAINT fk_turma_docentes_docentes FOREIGN KEY (docente_id) REFERENCES docentes(id),
  CONSTRAINT uk_turma_docente UNIQUE (turma_id, docente_id)
);

-- Acordos de convivência
CREATE TABLE acordos_convivencia (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  descricao TEXT NOT NULL,
  turma_id CHAR(36) NOT NULL,
  criado_por_id CHAR(36) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_acordos_turmas FOREIGN KEY (turma_id) REFERENCES turmas(id),
  CONSTRAINT fk_acordos_users FOREIGN KEY (criado_por_id) REFERENCES users(id)
);

-- Representantes da turma
CREATE TABLE representantes_turma (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NULL,
  telefone VARCHAR(30) NULL,
  turma_id CHAR(36) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_representantes_turmas FOREIGN KEY (turma_id) REFERENCES turmas(id)
);

-- Alunos
CREATE TABLE alunos (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  id_interno VARCHAR(50) NULL UNIQUE,
  nome_completo VARCHAR(180) NOT NULL,
  email VARCHAR(150) NULL UNIQUE,
  telefone VARCHAR(30) NULL,
  status ENUM('ATIVO', 'EVADIDO', 'TRANSFERIDO', 'CONCLUIDO') NOT NULL DEFAULT 'ATIVO',
  turma_id CHAR(36) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_alunos_turmas FOREIGN KEY (turma_id) REFERENCES turmas(id)
);

-- Unidades Curriculares
CREATE TABLE unidades_curriculares (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nome VARCHAR(180) NOT NULL,
  carga_horaria INT NOT NULL,
  quant_aulas INT NOT NULL,
  turma_id CHAR(36) NOT NULL,
  docente_id CHAR(36) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_ucs_turmas FOREIGN KEY (turma_id) REFERENCES turmas(id),
  CONSTRAINT fk_ucs_docentes FOREIGN KEY (docente_id) REFERENCES docentes(id)
);

-- Registro de aulas
CREATE TABLE aulas (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  data DATE NOT NULL,
  numero_aula INT NOT NULL,
  tema VARCHAR(200) NOT NULL,
  conteudo_desenvolvido TEXT NOT NULL,
  atividades_realizadas TEXT NULL,
  observacoes TEXT NULL,
  uc_id CHAR(36) NOT NULL,
  docente_id CHAR(36) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_aulas_ucs FOREIGN KEY (uc_id) REFERENCES unidades_curriculares(id),
  CONSTRAINT fk_aulas_users FOREIGN KEY (docente_id) REFERENCES users(id)
);

-- Indicadores avaliados
CREATE TABLE indicadores (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  descricao TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL
);

-- Relação entre aulas e indicadores
CREATE TABLE aula_indicadores (
  aula_id CHAR(36) NOT NULL,
  indicador_id CHAR(36) NOT NULL,
  PRIMARY KEY (aula_id, indicador_id),
  CONSTRAINT fk_aula_indicadores_aulas FOREIGN KEY (aula_id) REFERENCES aulas(id),
  CONSTRAINT fk_aula_indicadores_indicadores FOREIGN KEY (indicador_id) REFERENCES indicadores(id)
);

-- Observações pedagógicas
-- Importante: tabela pensada para histórico. Não atualize observações antigas; crie novos registros.
CREATE TABLE observacoes_pedagogicas (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  descricao TEXT NOT NULL,
  data DATE NOT NULL,
  aluno_id CHAR(36) NOT NULL,
  docente_id CHAR(36) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_observacoes_alunos FOREIGN KEY (aluno_id) REFERENCES alunos(id),
  CONSTRAINT fk_observacoes_users FOREIGN KEY (docente_id) REFERENCES users(id)
);

-- Auditoria do sistema
CREATE TABLE audit_logs (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id CHAR(36) NOT NULL,
  action ENUM('CRIACAO', 'ATUALIZACAO', 'EXCLUSAO', 'LOGIN', 'LOGOUT') NOT NULL,
  entidade VARCHAR(100) NOT NULL,
  entidade_id CHAR(36) NOT NULL,
  dados_antigos JSON NULL,
  dados_novos JSON NULL,
  ip_address VARCHAR(80) NULL,
  user_agent TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_audit_users FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_audit_entidade ON audit_logs(entidade, entidade_id);
CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_created_at ON audit_logs(created_at);
CREATE INDEX idx_alunos_turma ON alunos(turma_id);
CREATE INDEX idx_aulas_uc ON aulas(uc_id);
CREATE INDEX idx_ucs_turma ON unidades_curriculares(turma_id);

-- Dados iniciais simples para teste
-- Senha fictícia ainda NÃO criptografada. No sistema real, o NestJS deve salvar senha com bcrypt.
INSERT INTO users (id, nome, email, senha_hash, role) VALUES
('11111111-1111-1111-1111-111111111111', 'Administrador PCTD', 'admin@pctd.local', 'trocar-por-hash-bcrypt', 'ADMIN'),
('22222222-2222-2222-2222-222222222222', 'Coordenação Pedagógica', 'coord@pctd.local', 'trocar-por-hash-bcrypt', 'COORDENACAO'),
('33333333-3333-3333-3333-333333333333', 'Docente Exemplo', 'docente@pctd.local', 'trocar-por-hash-bcrypt', 'DOCENTE');

INSERT INTO docentes (id, nome, email, cargo, user_id) VALUES
('44444444-4444-4444-4444-444444444444', 'Docente Exemplo', 'docente@pctd.local', 'Docente', '33333333-3333-3333-3333-333333333333');

INSERT INTO turmas (id, nome, periodo, curso, data_inicio, data_fim, status) VALUES
('55555555-5555-5555-5555-555555555555', 'TII - Turma Exemplo', 'NOITE', 'Técnico em Informática para Internet', '2026-02-01', '2026-12-20', 'ATIVA');

INSERT INTO turma_docentes (turma_id, docente_id) VALUES
('55555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444');

INSERT INTO unidades_curriculares (id, nome, carga_horaria, quant_aulas, turma_id, docente_id) VALUES
('66666666-6666-6666-6666-666666666666', 'UC7 - Desenvolvimento Back-End', 120, 30, '55555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444');

INSERT INTO alunos (id_interno, nome_completo, email, status, turma_id) VALUES
('001', 'Aluno Exemplo 1', 'aluno1@pctd.local', 'ATIVO', '55555555-5555-5555-5555-555555555555'),
('002', 'Aluno Exemplo 2', 'aluno2@pctd.local', 'ATIVO', '55555555-5555-5555-5555-555555555555');

INSERT INTO indicadores (descricao) VALUES
('Participação nas atividades propostas'),
('Compreensão dos conceitos trabalhados'),
('Aplicação prática do conteúdo desenvolvido');

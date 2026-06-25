DROP DATABASE IF EXISTS pctd;
CREATE DATABASE pctd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pctd;

CREATE TABLE user (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  role ENUM('ADMIN', 'COORDENACAO', 'DOCENTE') NOT NULL DEFAULT 'DOCENTE',
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  foto_perfil VARCHAR(255),
  ultimo_login DATETIME,
  refresh_token TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME
);

CREATE TABLE turma (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nome VARCHAR(150) NOT NULL,
  periodo ENUM('MANHA', 'TARDE', 'NOITE') NOT NULL,
  curso VARCHAR(150) NOT NULL,
  ano_letivo INT,
  semestre INT,
  data_inicio DATE NOT NULL,
  data_fim DATE,
  status ENUM('ATIVA', 'ENCERRADA', 'CANCELADA') NOT NULL DEFAULT 'ATIVA',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME
);

CREATE TABLE aluno (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  id_interno VARCHAR(50) UNIQUE,
  nome_completo VARCHAR(180) NOT NULL,
  email VARCHAR(150) UNIQUE,
  telefone VARCHAR(30),
  status ENUM('ATIVO', 'EVADIDO', 'TRANSFERIDO', 'CONCLUIDO') NOT NULL DEFAULT 'ATIVO',
  turma_id CHAR(36) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  CONSTRAINT fk_aluno_turma FOREIGN KEY (turma_id) REFERENCES turma(id)
);

CREATE TABLE unidade_curricular (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nome VARCHAR(180) NOT NULL,
  carga_horaria INT NOT NULL,
  quant_aulas INT NOT NULL,
  ordem INT,
  data_inicio DATE,
  data_fim DATE,
  turma_id CHAR(36) NOT NULL,
  docente_id CHAR(36) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  CONSTRAINT fk_uc_turma FOREIGN KEY (turma_id) REFERENCES turma(id),
  CONSTRAINT fk_uc_docente FOREIGN KEY (docente_id) REFERENCES user(id)
);

CREATE TABLE aula (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  data DATE NOT NULL,
  numero_aula INT NOT NULL,
  tema VARCHAR(200) NOT NULL,
  conteudo_desenvolvido TEXT NOT NULL,
  atividades_realizadas TEXT,
  observacoes TEXT,
  uc_id CHAR(36) NOT NULL,
  docente_id CHAR(36) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  CONSTRAINT fk_aula_uc FOREIGN KEY (uc_id) REFERENCES unidade_curricular(id),
  CONSTRAINT fk_aula_docente FOREIGN KEY (docente_id) REFERENCES user(id)
);

CREATE TABLE indicador (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  descricao TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME
);

CREATE TABLE aula_indicador (
  aula_id CHAR(36) NOT NULL,
  indicador_id CHAR(36) NOT NULL,
  PRIMARY KEY (aula_id, indicador_id),
  CONSTRAINT fk_aula_indicador_aula FOREIGN KEY (aula_id) REFERENCES aula(id),
  CONSTRAINT fk_aula_indicador_indicador FOREIGN KEY (indicador_id) REFERENCES indicador(id)
);

CREATE TABLE observacao_pedagogica (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  descricao TEXT NOT NULL,
  data DATE NOT NULL,
  aluno_id CHAR(36) NOT NULL,
  docente_id CHAR(36) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_observacao_aluno FOREIGN KEY (aluno_id) REFERENCES aluno(id),
  CONSTRAINT fk_observacao_docente FOREIGN KEY (docente_id) REFERENCES user(id)
);

CREATE TABLE audit_log (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id CHAR(36) NOT NULL,
  action ENUM('CRIACAO', 'ATUALIZACAO', 'EXCLUSAO', 'LOGIN', 'LOGOUT') NOT NULL,
  entidade VARCHAR(100) NOT NULL,
  entidade_id CHAR(36) NOT NULL,
  dados_antigos LONGTEXT,
  dados_novos LONGTEXT,
  ip_address VARCHAR(80),
  user_agent TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES user(id)
);
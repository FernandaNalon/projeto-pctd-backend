# Arquitetura do Sistema

## Banco de dados

MariaDB

Banco:

pctd

---

## Estrutura da API

src

auth

prisma

users

docentes

turmas

alunos

unidades-curriculares

aulas

observacoes

dashboard

---

## Segurança

Autenticação:

- bcrypt
- JWT

Proteção:

- JwtAuthGuard
- RolesGuard

Perfis:

- ADMIN
- COORDENACAO
- DOCENTE
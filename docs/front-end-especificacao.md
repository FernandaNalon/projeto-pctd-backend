# Especificação Front-end PCTD

Tecnologias obrigatórias:

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn/UI

Objetivo:

Construir a interface do sistema PCTD consumindo a API NestJS já existente.

## Telas

### Login

Campos:

- E-mail
- Senha

Botão:

- Entrar

Consumir:

POST /auth/login

---

### Dashboard

Exibir:

- Quantidade de turmas
- Quantidade de alunos
- Quantidade de docentes
- Quantidade de usuários
- Quantidade de unidades curriculares
- Quantidade de aulas
- Quantidade de observações

Consumir:

GET /dashboard

---

### Turmas

Exibir:

- Lista de turmas
- Criar turma
- Editar turma
- Excluir turma

Consumir:

GET /turmas
POST /turmas
PUT /turmas/:id
DELETE /turmas/:id

---

### Alunos

Exibir:

- Lista de alunos
- Criar aluno
- Editar aluno
- Excluir aluno

Consumir:

GET /alunos
POST /alunos
PUT /alunos/:id
DELETE /alunos/:id

---

### Docentes

Exibir:

- Lista de docentes
- Criar docente
- Editar docente
- Excluir docente

Consumir:

GET /docentes
POST /docentes
PUT /docentes/:id
DELETE /docentes/:id

---

### Unidades Curriculares

Exibir:

- Lista
- Criar
- Editar
- Excluir

Consumir:

GET /unidades-curriculares
POST /unidades-curriculares
PUT /unidades-curriculares/:id
DELETE /unidades-curriculares/:id

---

### Aulas

Exibir:

- Lista
- Criar
- Editar
- Excluir

Consumir:

GET /aulas
POST /aulas
PUT /aulas/:id
DELETE /aulas/:id

---

### Observações

Exibir:

- Lista
- Criar observação

Consumir:

GET /observacoes
GET /observacoes/aluno/:alunoId
POST /observacoes

---

## Regras visuais

Layout moderno.

Menu lateral fixo.

Cabeçalho superior.

Cards informativos no Dashboard.

Layout responsivo.

Não utilizar Bootstrap.

Utilizar Tailwind e componentes Shadcn/UI.
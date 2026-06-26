import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlunosService {
  constructor(private prisma: PrismaService) { }

  async listar() {
    return this.prisma.aluno.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        turma: true,
      },
      orderBy: {
        nomeCompleto: 'asc',
      },
    });
  }

  async buscarPorId(id: string) {
    return this.prisma.aluno.findUnique({
      where: { id },
      include: {
        turma: true,
        registros: true,
      },
    });
  }

  async criar(dados: any) {
    return this.prisma.aluno.create({
      data: {
        idInterno: dados.idInterno || null,
        nomeCompleto: dados.nomeCompleto,
        status: dados.status,
        observacoesDocente: dados.observacoesDocente || null,
        turmaId: dados.turmaId,
      },
    });
  }

  async atualizar(id: string, dados: any) {
    return this.prisma.aluno.update({
      where: { id },
      data: {
        idInterno: dados.idInterno,
        nomeCompleto: dados.nomeCompleto,
        status: dados.status,
        observacoesDocente: dados.observacoesDocente,
      },
    });
  }

  async remover(id: string) {
    return this.prisma.aluno.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
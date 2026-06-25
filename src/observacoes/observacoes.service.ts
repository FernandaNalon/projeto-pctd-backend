import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ObservacoesService {
  constructor(private prisma: PrismaService) { }

  async listar() {
    return this.prisma.observacaoPedagogica.findMany({
      include: {
        aluno: true,
        docente: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async buscarPorId(id: string) {
    return this.prisma.observacaoPedagogica.findUnique({
      where: { id },
      include: {
        aluno: true,
        docente: true,
      },
    });
  }

  async listarPorAluno(alunoId: string) {
    return this.prisma.observacaoPedagogica.findMany({
      where: {
        alunoId,
      },
      include: {
        docente: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async criar(dados: any) {
    return this.prisma.observacaoPedagogica.create({
      data: {
        titulo: dados.titulo,
        descricao: dados.descricao,
        categoria: dados.categoria,
        prioridade: dados.prioridade,
        status: dados.status,
        data: new Date(dados.data),
        turmaId: dados.turmaId || null,
        alunoId: dados.alunoId || null,
        docenteId: dados.docenteId,
      },
    });
  }
}
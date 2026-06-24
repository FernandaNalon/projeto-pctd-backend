import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ObservacoesService {
  constructor(private prisma: PrismaService) {}

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
        descricao: dados.descricao,
        data: dados.data ? new Date(dados.data) : new Date(),
        alunoId: dados.alunoId,
        docenteId: dados.docenteId,
      },
    });
  }
}
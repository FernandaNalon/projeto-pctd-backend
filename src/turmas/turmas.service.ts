import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TurmasService {
  constructor(private prisma: PrismaService) {}

  async listar() {
    return this.prisma.turma.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async buscarPorId(id: string) {
    return this.prisma.turma.findUnique({
      where: { id },
    });
  }

  async criar(dados: any) {
    return this.prisma.turma.create({
      data: {
        nome: dados.nome,
        periodo: dados.periodo,
        curso: dados.curso,
        dataInicio: new Date(dados.dataInicio),
        dataFim: new Date(dados.dataFim),
        status: dados.status ?? 'ATIVA',
      },
    });
  }

  async atualizar(id: string, dados: any) {
    return this.prisma.turma.update({
      where: { id },
      data: {
        nome: dados.nome,
        periodo: dados.periodo,
        curso: dados.curso,
        dataInicio: dados.dataInicio ? new Date(dados.dataInicio) : undefined,
        dataFim: dados.dataFim ? new Date(dados.dataFim) : undefined,
        status: dados.status,
      },
    });
  }

  async remover(id: string) {
    return this.prisma.turma.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
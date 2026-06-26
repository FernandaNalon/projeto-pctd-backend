import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TurmasService {
  constructor(private prisma: PrismaService) { }

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
      include: {
        alunos: true,
        ucs: true,
        registros: true,
      },
    });
  }

  async criar(dados: any) {
    return this.prisma.turma.create({
      data: {
        nome: dados.nome,
        curso: dados.curso,
        periodo: dados.periodo,
        dataInicio: new Date(dados.dataInicio),
        dataFim: dados.dataFim ? new Date(dados.dataFim) : null,
        status: dados.status ?? 'ATIVA',
      },
    });
  }

  async atualizar(id: string, dados: any) {
    const data: any = {
      nome: dados.nome,
      curso: dados.curso,
      periodo: dados.periodo,
      dataInicio: dados.dataInicio ? new Date(dados.dataInicio) : undefined,
      status: dados.status,
    };

    if (dados.dataFim === null) {
      data.dataFim = null;
    } else if (dados.dataFim) {
      data.dataFim = new Date(dados.dataFim);
    }

    return this.prisma.turma.update({
      where: { id },
      data,
    });
  }

  async remover(id: string) {
    return this.prisma.turma.update({
      where: { id },
      data: {
        status: 'ARQUIVADA',
      },
    });
  }

  async desarquivar(id: string) {
    return this.prisma.turma.update({
      where: { id },
      data: {
        status: 'ATIVA',
      },
    });
  }
}
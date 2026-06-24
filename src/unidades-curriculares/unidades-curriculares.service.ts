import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UnidadesCurricularesService {
  constructor(private prisma: PrismaService) {}

  async listar() {
    return this.prisma.unidadeCurricular.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        turma: true,
        docente: true,
      },
      orderBy: {
        nome: 'asc',
      },
    });
  }

  async buscarPorId(id: string) {
    return this.prisma.unidadeCurricular.findUnique({
      where: { id },
      include: {
        turma: true,
        docente: true,
        aulas: true,
      },
    });
  }

  async criar(dados: any) {
    return this.prisma.unidadeCurricular.create({
      data: {
        nome: dados.nome,
        cargaHoraria: dados.cargaHoraria,
        quantAulas: dados.quantAulas,
        turmaId: dados.turmaId,
        docenteId: dados.docenteId,
      },
    });
  }

  async atualizar(id: string, dados: any) {
    return this.prisma.unidadeCurricular.update({
      where: { id },
      data: {
        nome: dados.nome,
        cargaHoraria: dados.cargaHoraria,
        quantAulas: dados.quantAulas,
        turmaId: dados.turmaId,
        docenteId: dados.docenteId,
      },
    });
  }

  async remover(id: string) {
    return this.prisma.unidadeCurricular.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
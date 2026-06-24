import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AulasService {
  constructor(private prisma: PrismaService) {}

  async listar() {
    return this.prisma.aula.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        uc: true,
        docente: true,
      },
      orderBy: {
        data: 'desc',
      },
    });
  }

  async buscarPorId(id: string) {
    return this.prisma.aula.findUnique({
      where: { id },
      include: {
        uc: true,
        docente: true,
        indicadores: true,
      },
    });
  }

  async criar(dados: any) {
    return this.prisma.aula.create({
      data: {
        data: new Date(dados.data),
        numeroAula: dados.numeroAula,
        tema: dados.tema,
        conteudoDesenvolvido: dados.conteudoDesenvolvido,
        atividadesRealizadas: dados.atividadesRealizadas,
        observacoes: dados.observacoes,
        ucId: dados.ucId,
        docenteId: dados.docenteId,
      },
    });
  }

  async atualizar(id: string, dados: any) {
    return this.prisma.aula.update({
      where: { id },
      data: {
        data: dados.data ? new Date(dados.data) : undefined,
        numeroAula: dados.numeroAula,
        tema: dados.tema,
        conteudoDesenvolvido: dados.conteudoDesenvolvido,
        atividadesRealizadas: dados.atividadesRealizadas,
        observacoes: dados.observacoes,
      },
    });
  }

  async remover(id: string) {
    return this.prisma.aula.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
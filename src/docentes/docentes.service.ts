import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocentesService {
  constructor(private prisma: PrismaService) {}

  async listar() {
    return this.prisma.docente.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        nome: 'asc',
      },
    });
  }

  async buscarPorId(id: string) {
    return this.prisma.docente.findUnique({
      where: { id },
      include: {
        user: true,
        ucs: true,
        turmaDocentes: {
          include: {
            turma: true,
          },
        },
      },
    });
  }

  async criar(dados: any) {
    return this.prisma.docente.create({
      data: {
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        cargo: dados.cargo,
        userId: dados.userId,
      },
    });
  }

  async atualizar(id: string, dados: any) {
    return this.prisma.docente.update({
      where: { id },
      data: {
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        cargo: dados.cargo,
        ativo: dados.ativo,
        userId: dados.userId,
      },
    });
  }

  async remover(id: string) {
    return this.prisma.docente.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { CreateComentarioDto } from './dto/create-comentario.dto';

@Injectable()
export class RegistrosService {
  constructor(private readonly prisma: PrismaService) {}

  listar() {
    return this.prisma.registroInterno.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        turma: true,
        aluno: true,
        autor: true,
        comentarios: {
          include: {
            usuario: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async buscarPorId(id: string) {
    const registro = await this.prisma.registroInterno.findUnique({
      where: { id },
      include: {
        turma: true,
        aluno: true,
        autor: true,
        comentarios: {
          include: {
            usuario: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!registro) {
      throw new NotFoundException('Registro não encontrado.');
    }

    return registro;
  }

  criar(dados: CreateRegistroDto) {
    return this.prisma.registroInterno.create({
      data: {
        titulo: dados.titulo,
        descricao: dados.descricao,
        categoria: dados.categoria,
        prioridade: dados.prioridade,
        status: dados.status,
        data: new Date(dados.data),
        turmaId: dados.turmaId || null,
        alunoId: dados.alunoId || null,
        autorId: dados.autorId,
      },
    });
  }

  atualizar(id: string, dados: UpdateRegistroDto) {
    return this.prisma.registroInterno.update({
      where: { id },
      data: {
        titulo: dados.titulo,
        descricao: dados.descricao,
        categoria: dados.categoria,
        prioridade: dados.prioridade,
        status: dados.status,
      },
    });
  }

  comentar(registroId: string, dados: CreateComentarioDto) {
    return this.prisma.registroComentario.create({
      data: {
        registroId,
        usuarioId: dados.usuarioId,
        comentario: dados.comentario,
      },
    });
  }
}
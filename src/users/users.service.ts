import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async listar() {
    return this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        nome: 'asc',
      },
    });
  }

  async buscarPorId(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async buscarPorEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
        deletedAt: null,
        ativo: true,
      },
    });
  }
  
  async criar(dados: any) {
    const senhaCriptografada = await bcrypt.hash(dados.senhaHash, 10);

    return this.prisma.user.create({
      data: {
        nome: dados.nome,
        email: dados.email,
        senhaHash: senhaCriptografada,
        role: dados.role ?? 'DOCENTE',
        ativo: dados.ativo ?? true,
      },
    });
  }

  async atualizar(id: string, dados: any) {
    const senhaCriptografada = dados.senhaHash
      ? await bcrypt.hash(dados.senhaHash, 10)
      : undefined;

    return this.prisma.user.update({
      where: { id },
      data: {
        nome: dados.nome,
        email: dados.email,
        senhaHash: senhaCriptografada,
        role: dados.role,
        ativo: dados.ativo,
      },
    });
  }

  async remover(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
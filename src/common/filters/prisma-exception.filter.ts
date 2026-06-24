import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const code = exception.code;

    if (code === 'P2002') {
      throw new ConflictException('Já existe um registro com esse valor.');
    }

    if (code === 'P2003') {
      throw new BadRequestException('Registro relacionado não encontrado.');
    }

    if (code === 'P2025') {
      throw new NotFoundException('Registro não encontrado.');
    }

    throw new BadRequestException('Erro ao processar a solicitação.');
  }
}
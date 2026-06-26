import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error('ERRO PRISMA REAL:', exception);

    const code = exception.code;

    if (code === 'P2002') {
      throw new ConflictException('Já existe um registro com esse valor.');
    }

    if (code === 'P2003') {
      throw new BadRequestException(
        `Registro relacionado não encontrado: ${exception.meta?.field_name ?? ''}`,
      );
    }

    if (code === 'P2025') {
      throw new NotFoundException('Registro não encontrado.');
    }

    throw new BadRequestException(
      `Erro Prisma ${code}: ${exception.message}`,
    );
  }
}
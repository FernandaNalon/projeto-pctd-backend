import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum PeriodoTurma {
  MANHA = 'MANHA',
  TARDE = 'TARDE',
  NOITE = 'NOITE',
}

enum StatusTurma {
  ATIVA = 'ATIVA',
  ENCERRADA = 'ENCERRADA',
  CANCELADA = 'CANCELADA',
}

export class CreateTurmaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEnum(PeriodoTurma)
  periodo: PeriodoTurma;

  @IsString()
  @IsNotEmpty()
  curso: string;

  @IsDateString()
  dataInicio: string;

  @IsDateString()
  dataFim: string;

  @IsOptional()
  @IsEnum(StatusTurma)
  status?: StatusTurma;
}
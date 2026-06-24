import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum StatusAluno {
  ATIVO = 'ATIVO',
  EVADIDO = 'EVADIDO',
  TRANSFERIDO = 'TRANSFERIDO',
  CONCLUIDO = 'CONCLUIDO',
}

export class CreateAlunoDto {
  @IsOptional()
  @IsString()
  idInterno?: string;

  @IsString()
  @IsNotEmpty()
  nomeCompleto: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsEnum(StatusAluno)
  status?: StatusAluno;

  @IsString()
  @IsNotEmpty()
  turmaId: string;
}
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlunoDto {
  @IsOptional()
  @IsString()
  idInterno?: string;

  @IsString()
  @IsNotEmpty()
  nomeCompleto: string;

  @IsEnum(['ATIVO', 'EVADIDO', 'TRANSFERIDO', 'CONCLUIDO'])
  status: 'ATIVO' | 'EVADIDO' | 'TRANSFERIDO' | 'CONCLUIDO';

  @IsOptional()
  @IsString()
  observacoesDocente?: string;

  @IsString()
  @IsNotEmpty()
  turmaId: string;
}
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateAlunoDto {
  @IsOptional()
  @IsString()
  idInterno?: string;

  @IsOptional()
  @IsString()
  nomeCompleto?: string;

  @IsOptional()
  @IsEnum(['ATIVO', 'EVADIDO', 'TRANSFERIDO', 'CONCLUIDO'])
  status?: 'ATIVO' | 'EVADIDO' | 'TRANSFERIDO' | 'CONCLUIDO';

  @IsOptional()
  @IsString()
  observacoesDocente?: string;
}
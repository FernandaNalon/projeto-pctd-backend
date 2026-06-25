import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTurmaDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  curso?: string;

  @IsOptional()
  @IsEnum(['MANHA', 'TARDE', 'NOITE'])
  periodo?: 'MANHA' | 'TARDE' | 'NOITE';

  @IsOptional()
  @IsDateString()
  dataInicio?: string;

  @IsOptional()
  @IsDateString()
  dataFim?: string | null;

  @IsOptional()
  @IsEnum(['ATIVA', 'ENCERRADA', 'CANCELADA'])
  status?: 'ATIVA' | 'ENCERRADA' | 'CANCELADA';
}
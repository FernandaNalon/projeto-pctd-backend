import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateRegistroDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsEnum(['PEDAGOGICA', 'COMUNICADO', 'ACOMPANHAMENTO'])
  categoria?: 'PEDAGOGICA' | 'COMUNICADO' | 'ACOMPANHAMENTO';

  @IsOptional()
  @IsEnum(['BAIXA', 'MEDIA', 'ALTA'])
  prioridade?: 'BAIXA' | 'MEDIA' | 'ALTA';

  @IsOptional()
  @IsEnum(['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO'])
  status?: 'ABERTO' | 'EM_ANDAMENTO' | 'CONCLUIDO';
}
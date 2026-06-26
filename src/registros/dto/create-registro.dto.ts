import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRegistroDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsEnum(['PEDAGOGICA', 'COMUNICADO', 'ACOMPANHAMENTO'])
  categoria: 'PEDAGOGICA' | 'COMUNICADO' | 'ACOMPANHAMENTO';

  @IsEnum(['BAIXA', 'MEDIA', 'ALTA'])
  prioridade: 'BAIXA' | 'MEDIA' | 'ALTA';

  @IsEnum(['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO'])
  status: 'ABERTO' | 'EM_ANDAMENTO' | 'CONCLUIDO';

  @IsDateString()
  data: string;

  @IsOptional()
  @IsString()
  turmaId?: string;

  @IsOptional()
  @IsString()
  alunoId?: string;

  @IsString()
  @IsNotEmpty()
  autorId: string;
}
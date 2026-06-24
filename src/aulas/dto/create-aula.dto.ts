import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateAulaDto {
  @IsDateString()
  data: string;

  @IsInt()
  @Min(1)
  numeroAula: number;

  @IsString()
  @IsNotEmpty()
  tema: string;

  @IsString()
  @IsNotEmpty()
  conteudoDesenvolvido: string;

  @IsOptional()
  @IsString()
  atividadesRealizadas?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsString()
  @IsNotEmpty()
  ucId: string;

  @IsString()
  @IsNotEmpty()
  docenteId: string;
}
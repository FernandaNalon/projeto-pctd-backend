import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateObservacaoDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsOptional()
  @IsDateString()
  data?: string;

  @IsString()
  @IsNotEmpty()
  alunoId: string;

  @IsString()
  @IsNotEmpty()
  docenteId: string;
}
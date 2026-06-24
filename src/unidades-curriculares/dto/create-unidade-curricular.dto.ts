import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateUnidadeCurricularDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsInt()
  @Min(1)
  cargaHoraria: number;

  @IsInt()
  @Min(1)
  quantAulas: number;

  @IsString()
  @IsNotEmpty()
  turmaId: string;

  @IsString()
  @IsNotEmpty()
  docenteId: string;
}
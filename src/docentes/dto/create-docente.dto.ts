import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDocenteDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  cargo?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadeCurricularDto } from './create-unidade-curricular.dto';

export class UpdateUnidadeCurricularDto extends PartialType(
  CreateUnidadeCurricularDto,
) {}
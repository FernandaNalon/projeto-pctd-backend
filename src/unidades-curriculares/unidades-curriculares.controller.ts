import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UnidadesCurricularesService } from './unidades-curriculares.service';

import { CreateUnidadeCurricularDto } from './dto/create-unidade-curricular.dto';
import { UpdateUnidadeCurricularDto } from './dto/update-unidade-curricular.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('unidades-curriculares')
export class UnidadesCurricularesController {
  constructor(
    private readonly unidadesCurricularesService: UnidadesCurricularesService,
  ) {}

  @Get()
  listar() {
    return this.unidadesCurricularesService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.unidadesCurricularesService.buscarPorId(id);
  }

  @Post()
  @Roles('ADMIN', 'DOCENTE')
  criar(@Body() dados: CreateUnidadeCurricularDto) {
    return this.unidadesCurricularesService.criar(dados);
  }

  @Put(':id')
  @Roles('ADMIN', 'DOCENTE')
  atualizar(
    @Param('id') id: string,
    @Body() dados: UpdateUnidadeCurricularDto,
  ) {
    return this.unidadesCurricularesService.atualizar(id, dados);
  }

  @Delete(':id')
  @Roles('ADMIN', 'DOCENTE')
  remover(@Param('id') id: string) {
    return this.unidadesCurricularesService.remover(id);
  }
}
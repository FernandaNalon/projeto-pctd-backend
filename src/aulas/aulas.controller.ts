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

import { AulasService } from './aulas.service';

import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('aulas')
export class AulasController {
  constructor(
    private readonly aulasService: AulasService,
  ) {}

  @Get()
  listar() {
    return this.aulasService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.aulasService.buscarPorId(id);
  }

  @Post()
  @Roles('ADMIN', 'DOCENTE')
  criar(@Body() dados: CreateAulaDto) {
    return this.aulasService.criar(dados);
  }

  @Put(':id')
  @Roles('ADMIN', 'DOCENTE')
  atualizar(
    @Param('id') id: string,
    @Body() dados: UpdateAulaDto,
  ) {
    return this.aulasService.atualizar(id, dados);
  }

  @Delete(':id')
  @Roles('ADMIN', 'DOCENTE')
  remover(@Param('id') id: string) {
    return this.aulasService.remover(id);
  }
}
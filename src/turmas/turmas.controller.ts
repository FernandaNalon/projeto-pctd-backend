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

import { TurmasService } from './turmas.service';

import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('turmas')
export class TurmasController {
  constructor(
    private readonly turmasService: TurmasService,
  ) {}

  @Get()
  listar() {
    return this.turmasService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.turmasService.buscarPorId(id);
  }

  @Post()
  @Roles('ADMIN', 'DOCENTE')
  criar(@Body() dados: CreateTurmaDto) {
    return this.turmasService.criar(dados);
  }

  @Put(':id')
  @Roles('ADMIN', 'DOCENTE')
  atualizar(
    @Param('id') id: string,
    @Body() dados: UpdateTurmaDto,
  ) {
    return this.turmasService.atualizar(id, dados);
  }

  @Delete(':id')
  @Roles('ADMIN', 'DOCENTE')
  remover(@Param('id') id: string) {
    return this.turmasService.remover(id);
  }
}
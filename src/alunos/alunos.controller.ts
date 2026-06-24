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

import { AlunosService } from './alunos.service';

import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('alunos')
export class AlunosController {
  constructor(
    private readonly alunosService: AlunosService,
  ) {}

  @Get()
  listar() {
    return this.alunosService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.alunosService.buscarPorId(id);
  }

  @Post()
  @Roles('ADMIN', 'DOCENTE')
  criar(@Body() dados: CreateAlunoDto) {
    return this.alunosService.criar(dados);
  }

  @Put(':id')
  @Roles('ADMIN', 'DOCENTE')
  atualizar(
    @Param('id') id: string,
    @Body() dados: UpdateAlunoDto,
  ) {
    return this.alunosService.atualizar(id, dados);
  }

  @Delete(':id')
  @Roles('ADMIN', 'DOCENTE')
  remover(@Param('id') id: string) {
    return this.alunosService.remover(id);
  }
}
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ObservacoesService } from './observacoes.service';
import { CreateObservacaoDto } from './dto/create-observacao.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('observacoes')
export class ObservacoesController {
  constructor(
    private readonly observacoesService: ObservacoesService,
  ) {}

  @Get()
  listar() {
    return this.observacoesService.listar();
  }

  @Get('aluno/:alunoId')
  listarPorAluno(@Param('alunoId') alunoId: string) {
    return this.observacoesService.listarPorAluno(alunoId);
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.observacoesService.buscarPorId(id);
  }

  @Post()
  @Roles('ADMIN', 'DOCENTE')
  criar(@Body() dados: CreateObservacaoDto) {
    return this.observacoesService.criar(dados);
  }
}
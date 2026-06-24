import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Get()
  listar() {
    return this.docentesService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.docentesService.buscarPorId(id);
  }

  @Post()
  @Roles('ADMIN', 'COORDENACAO')
  criar(@Body() dados: CreateDocenteDto) {
    return this.docentesService.criar(dados);
  }

  @Put(':id')
  @Roles('ADMIN', 'COORDENACAO')
  atualizar(@Param('id') id: string, @Body() dados: UpdateDocenteDto) {
    return this.docentesService.atualizar(id, dados);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remover(@Param('id') id: string) {
    return this.docentesService.remover(id);
  }
}
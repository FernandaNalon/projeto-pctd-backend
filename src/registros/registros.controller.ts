import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RegistrosService } from './registros.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('registros')
export class RegistrosController {
  constructor(private readonly registrosService: RegistrosService) {}

  @Get()
  listar() {
    return this.registrosService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.registrosService.buscarPorId(id);
  }

  @Post()
  criar(@Body() dados: CreateRegistroDto) {
    return this.registrosService.criar(dados);
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() dados: UpdateRegistroDto) {
    return this.registrosService.atualizar(id, dados);
  }

  @Post(':id/comentarios')
  comentar(
    @Param('id') id: string,
    @Body() dados: CreateComentarioDto,
  ) {
    return this.registrosService.comentar(id, dados);
  }
}
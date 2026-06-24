import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  listar() {
    return this.usersService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.usersService.buscarPorId(id);
  }

  @Post()
  @Roles('ADMIN', 'COORDENACAO')
  criar(@Body() dados: CreateUserDto) {
    return this.usersService.criar(dados);
  }

  @Put(':id')
  @Roles('ADMIN', 'COORDENACAO')
  atualizar(@Param('id') id: string, @Body() dados: UpdateUserDto) {
    return this.usersService.atualizar(id, dados);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remover(@Param('id') id: string) {
    return this.usersService.remover(id);
  }
}
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TurmasModule } from './turmas/turmas.module';
import { AlunosModule } from './alunos/alunos.module';
import { UsersModule } from './users/users.module';
import { UnidadesCurricularesModule } from './unidades-curriculares/unidades-curriculares.module';
import { AulasModule } from './aulas/aulas.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RegistrosModule } from './registros/registros.module';

@Module({
  imports: [PrismaModule, TurmasModule, AlunosModule, UsersModule, UnidadesCurricularesModule, AulasModule, AuthModule, DashboardModule, RegistrosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

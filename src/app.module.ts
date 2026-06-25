import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TurmasModule } from './turmas/turmas.module';
import { AlunosModule } from './alunos/alunos.module';
import { UsersModule } from './users/users.module';
import { UnidadesCurricularesModule } from './unidades-curriculares/unidades-curriculares.module';
import { AulasModule } from './aulas/aulas.module';
import { ObservacoesModule } from './observacoes/observacoes.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [PrismaModule, TurmasModule, AlunosModule, UsersModule, UnidadesCurricularesModule, AulasModule, ObservacoesModule, AuthModule, DashboardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TurmasModule } from './turmas/turmas.module';
import { AlunosModule } from './alunos/alunos.module';
import { DocentesModule } from './docentes/docentes.module';
import { UsersModule } from './users/users.module';
import { UnidadesCurricularesModule } from './unidades-curriculares/unidades-curriculares.module';
import { AulasModule } from './aulas/aulas.module';
import { ObservacoesModule } from './observacoes/observacoes.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [PrismaModule, TurmasModule, AlunosModule, DocentesModule, UsersModule, UnidadesCurricularesModule, AulasModule, ObservacoesModule, AuthModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

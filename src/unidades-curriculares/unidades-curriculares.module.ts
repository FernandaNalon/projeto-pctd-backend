import { Module } from '@nestjs/common';
import { UnidadesCurricularesService } from './unidades-curriculares.service';
import { UnidadesCurricularesController } from './unidades-curriculares.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UnidadesCurricularesController],
  providers: [UnidadesCurricularesService],
})
export class UnidadesCurricularesModule {}
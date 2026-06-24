import { Module } from '@nestjs/common';
import { ObservacoesService } from './observacoes.service';
import { ObservacoesController } from './observacoes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ObservacoesController],
  providers: [ObservacoesService],
})
export class ObservacoesModule {}
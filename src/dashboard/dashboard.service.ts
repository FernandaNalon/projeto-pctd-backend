import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()

export class DashboardService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async obterResumo() {
        const [
            turmas,
            alunos,
            docentes,
            usuarios,
            unidadesCurriculares,
            aulas,
            observacoes,
        ] = await Promise.all([
            this.prisma.turma.count(),

            this.prisma.aluno.count(),

            this.prisma.docente.count(),

            this.prisma.user.count(),

            this.prisma.unidadeCurricular.count(),

            this.prisma.aula.count(),

            this.prisma.observacaoPedagogica.count(),
        ]);

        return {
            turmas,

            alunos,

            docentes,

            usuarios,

            unidadesCurriculares,

            aulas,

            observacoes,
        };
    }
}
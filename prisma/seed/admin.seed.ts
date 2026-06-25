import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaMariaDb({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'pctd',
});

const prisma = new PrismaClient({ adapter });

async function main() {
    const usuarioExiste = await prisma.user.findFirst({
        where: {
            email: 'admin@pctd.com',
        },
    });

    if (usuarioExiste) {
        console.log('Administrador já existe.');
        return;
    }

    const senhaHash = await bcrypt.hash('123456', 10);

    await prisma.user.create({
        data: {
            nome: 'Administrador',
            email: 'admin@pctd.com',
            senhaHash,
            role: 'ADMIN',
            ativo: true,
        },
    });

    console.log('Administrador criado com sucesso.');
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.categories.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Sem Categoria',
    },
  });

  console.log('Categoria padrão criada/verificada');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import * as bcrypt from 'bcrypt';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const main = async () => {
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD ?? '',
    10,
  );
  const email = process.env.ADMIN_EMAIL;
  console.log('Seeding user with email: ', email);
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user && email) {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }
  console.log('Seeding the bulls');

  await prisma.bull.createMany({
    data: [
      {
        caravana: '992',
        nombre: 'Toro Black Emerald',
        uso: 'vaquillona',
        origen: 'propio',
        pelaje: 'negro',
        raza: 'Angus',
        edadMeses: 36,
        caracteristicaDestacada: 'Top 1% calving ease',
        crecimiento: 85,
        facilidadParto: 98,
        reproduccion: 75,
        moderacion: 60,
        carcasa: 82,
      },
      {
        caravana: '845',
        nombre: 'Red Diamond',
        uso: 'vaca',
        origen: 'catalogo',
        pelaje: 'colorado',
        raza: 'Angus',
        edadMeses: 42,
        caracteristicaDestacada: 'Top 5% carcass',
        crecimiento: 90,
        facilidadParto: 40,
        reproduccion: 88,
        moderacion: 70,
        carcasa: 95,
      },
      {
        caravana: '102',
        nombre: 'General 102',
        uso: 'vaquillona',
        origen: 'catalogo',
        pelaje: 'negro',
        raza: 'Brangus',
        edadMeses: 30,
        caracteristicaDestacada: null,
        crecimiento: 70,
        facilidadParto: 92,
        reproduccion: 65,
        moderacion: 80,
        carcasa: 60,
      },
      {
        caravana: '554',
        nombre: 'Indomable',
        uso: 'vaca',
        origen: 'propio',
        pelaje: 'colorado',
        raza: 'Hereford',
        edadMeses: 48,
        caracteristicaDestacada: null,

        crecimiento: 60,
        facilidadParto: 30,
        reproduccion: 95,
        moderacion: 50,
        carcasa: 75,
      },
      {
        caravana: '210',
        nombre: 'Midnight Express',
        uso: 'vaquillona',
        origen: 'propio',
        pelaje: 'negro',
        raza: 'Angus',
        edadMeses: 28,
        caracteristicaDestacada: 'Efficiency Leader',
        crecimiento: 78,
        facilidadParto: 95,
        reproduccion: 82,
        moderacion: 85,
        carcasa: 68,
      },
      {
        caravana: '773',
        nombre: 'Rustic King',
        uso: 'vaca',
        origen: 'catalogo',
        pelaje: 'colorado',
        raza: 'Braford',
        edadMeses: 54,
        caracteristicaDestacada: 'Heat Tolerant',
        crecimiento: 92,
        facilidadParto: 35,
        reproduccion: 90,
        moderacion: 45,
        carcasa: 88,
      },
      {
        caravana: '304',
        nombre: 'Shadow Warrior',
        uso: 'vaquillona',
        origen: 'propio',
        pelaje: 'negro',
        raza: 'Brangus',
        edadMeses: 32,
        caracteristicaDestacada: 'Performance Pro',
        crecimiento: 88,
        facilidadParto: 85,
        reproduccion: 70,
        moderacion: 65,
        carcasa: 91,
      },
    ],
  });
};
main()
  .then(() => {
    console.log('Seeding finished.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

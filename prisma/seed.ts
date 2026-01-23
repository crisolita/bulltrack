import * as bcrypt from 'bcrypt';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const randomFrom = <T>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const main = async () => {
  /* ---------- ADMIN USER ---------- */
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD ?? '',
    10,
  );

  const email = process.env.ADMIN_EMAIL;
  if (email) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      await prisma.user.create({
        data: { email, password: hashedPassword },
      });
    }
  }

  console.log('Seeding bulls…');

  /* ---------- DATA POOLS ---------- */
  const nombres = [
    'Black Emerald',
    'Red Diamond',
    'Midnight King',
    'Shadow Warrior',
    'Indomable',
    'Rustic King',
    'General',
    'Titan',
    'Iron Bull',
    'Storm Rider',
  ];

  const razas = ['Angus', 'Brangus', 'Hereford', 'Braford'];
  const usos = ['vaquillona', 'vaca'] as const;
  const origenes = ['propio', 'catalogo'] as const;
  const pelajes = ['negro', 'colorado'] as const;

  /* ---------- GENERATE 1000 BULLS ---------- */
  const bulls = Array.from({ length: 1000 }).map((_, i) => {
    const nombreBase = randomFrom(nombres);
    const caravana = (1000 + i).toString();

    return {
      caravana,
      nombre: `${nombreBase} ${caravana}`,
      uso: randomFrom(usos),
      origen: randomFrom(origenes),
      pelaje: randomFrom(pelajes),
      raza: randomFrom(razas),
      edadMeses: randomInt(24, 60),
      caracteristicaDestacada:
        Math.random() > 0.6 ? 'High Performance Index' : null,

      crecimiento: randomInt(60, 95),
      facilidadParto: randomInt(30, 99),
      reproduccion: randomInt(50, 95),
      moderacion: randomInt(40, 90),
      carcasa: randomInt(55, 98),
    };
  });

  await prisma.bull.createMany({
    data: bulls,
    skipDuplicates: true,
  });

  console.log('Seeding finished.');
};

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

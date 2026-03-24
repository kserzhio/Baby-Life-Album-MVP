import { MemoryCategory, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.growthEntry.deleteMany();
  await prisma.memory.deleteMany();
  await prisma.child.deleteMany();

  const child = await prisma.child.create({
    data: {
      firstName: "Дем'ян",
      lastName: "Костенко",
      birthDate: new Date("2026-02-27T00:00:00.000Z")
    }
  });

  await prisma.memory.createMany({
    data: [
    ]
  });

  await prisma.growthEntry.createMany({
    data: [
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

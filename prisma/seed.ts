import { MemoryCategory, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.growthEntry.deleteMany();
  await prisma.memory.deleteMany();
  await prisma.child.deleteMany();

  const child = await prisma.child.create({
    data: {
      firstName: "Sophie",
      lastName: "Parker",
      birthDate: new Date("2024-05-18T00:00:00.000Z")
    }
  });

  await prisma.memory.createMany({
    data: [
      {
        childId: child.id,
        title: "First Smile",
        category: MemoryCategory.FIRST_SMILE,
        eventDate: new Date("2024-06-30T00:00:00.000Z"),
        description: "A sleepy little grin after morning cuddles on the nursery chair.",
        imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80"
      },
      {
        childId: child.id,
        title: "First Tooth",
        category: MemoryCategory.FIRST_TOOTH,
        eventDate: new Date("2024-11-02T00:00:00.000Z"),
        description: "The tiniest tooth finally peeked through after a fussy week."
      },
      {
        childId: child.id,
        title: "First Steps Across the Living Room",
        category: MemoryCategory.FIRST_STEPS,
        eventDate: new Date("2025-03-09T00:00:00.000Z"),
        description: "Three brave steps from the sofa to mom, followed by a very proud clap.",
        imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80"
      },
      {
        childId: child.id,
        title: "First Word",
        category: MemoryCategory.FIRST_WORD,
        eventDate: new Date("2025-01-14T00:00:00.000Z"),
        description: "Clear as day: 'mama' during breakfast."
      },
      {
        childId: child.id,
        title: "12-Month Pediatric Checkup",
        category: MemoryCategory.DOCTOR_VISIT,
        eventDate: new Date("2025-05-20T00:00:00.000Z"),
        description: "Routine visit with vaccines, growth review, and a happy all-clear."
      },
      {
        childId: child.id,
        title: "Sunny Park Picnic",
        category: MemoryCategory.PHOTO_MEMORY,
        eventDate: new Date("2025-06-08T00:00:00.000Z"),
        description: "An afternoon on the picnic blanket with strawberries and bubbles.",
        imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  });

  await prisma.growthEntry.createMany({
    data: [
      {
        childId: child.id,
        recordedAt: new Date("2024-06-18T00:00:00.000Z"),
        heightCm: 55.4,
        weightKg: 4.6,
        notes: "One-month checkup. Eating and sleeping well."
      },
      {
        childId: child.id,
        recordedAt: new Date("2024-09-18T00:00:00.000Z"),
        heightCm: 63.8,
        weightKg: 6.7,
        notes: "Four-month visit with lots of smiles."
      },
      {
        childId: child.id,
        recordedAt: new Date("2024-12-18T00:00:00.000Z"),
        heightCm: 69.2,
        weightKg: 8.1,
        notes: "Rolling confidently and very curious."
      },
      {
        childId: child.id,
        recordedAt: new Date("2025-03-18T00:00:00.000Z"),
        heightCm: 74.9,
        weightKg: 9.1,
        notes: "Standing with support."
      },
      {
        childId: child.id,
        recordedAt: new Date("2025-06-18T00:00:00.000Z"),
        heightCm: 79.4,
        weightKg: 9.8,
        notes: "Walking more each day."
      }
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

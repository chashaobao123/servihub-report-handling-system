import { PrismaClient, ReportType, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@servihub.com" },
    update: {},
    create: {
      email: "admin@servihub.com",
      name: "Admin User",
      role: UserRole.admin,
    },
  })

  const user1 = await prisma.user.upsert({
    where: { email: "user1@servihub.com" },
    update: {},
    create: {
      email: "user1@servihub.com",
      name: "User One",
      role: UserRole.user,
    },
  })

  // Use a known unique combination for upsert
  const existingReport = await prisma.report.findFirst({
    where: {
      target_id: BigInt(101),
      submitted_by: user1.id,
    },
  })

  let report
  if (!existingReport) {
    report = await prisma.report.create({
      data: {
        type: ReportType.review,
        target_id: BigInt(101),
        reason: "Spam content",
        description: "Contains promotional links.",
        submitted_by: user1.id,
      },
    })
  } else {
    report = existingReport
  }

  console.log({ admin, user1, report })
}

main()
  .catch((e) => {
    console.error("Seed error:", e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())

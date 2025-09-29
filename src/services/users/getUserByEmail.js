import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserByEmail(userEmail) {
  return prisma.user.findFirst({
    where: { email: userEmail },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
    },
  });
}
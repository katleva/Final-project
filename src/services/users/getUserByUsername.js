import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserByUsername(username) {
  return prisma.user.findUnique({
    where: { username },
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
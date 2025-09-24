import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createHost(data) {
  return await prisma.host.create({
    data,
  });
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateHost(id, data) {
  return await prisma.host.update({
    where: { id },
    data,
  });
}

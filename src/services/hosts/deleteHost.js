import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteHost(id) {
  return await prisma.host.delete({
    where: { id },
  });
}

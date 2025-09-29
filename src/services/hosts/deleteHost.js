import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteHost(id) {
  const existingHost = await prisma.host.findUnique({ where: { id } });
  if (!existingHost) return null;

  await prisma.host.delete({ where: { id } });
  return true;
}

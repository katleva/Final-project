import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const deleteProperty = async (id) => {
  const existing = await prisma.property.findUnique({ where: { id } });
  if (!existing) return null;
  await prisma.property.delete({ where: { id } });
  return true;
};

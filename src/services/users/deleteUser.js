import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const deleteUser = async (id) => {
  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (!existingUser) return null;


  await prisma.user.delete({ where: { id } });
  return true;
};

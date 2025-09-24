import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteUser = async (id) => {
  return prisma.user.delete({
    where: { id },
  });
};

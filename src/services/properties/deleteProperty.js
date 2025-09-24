import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const deleteProperty = async (id) => {
  return prisma.property.delete({
    where: { id },
  });
};

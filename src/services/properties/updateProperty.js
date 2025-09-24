import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const updateProperty = async (id, data) => {
  return prisma.property.update({
    where: { id },
    data,
  });
};

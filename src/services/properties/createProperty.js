import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createProperty = async (data) => {
  return prisma.property.create({
    data,
  });
};

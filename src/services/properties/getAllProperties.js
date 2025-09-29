import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllProperties = async (filters = {}) => {
  return prisma.property.findMany({
    where: filters,
  });
};

export default getAllProperties;

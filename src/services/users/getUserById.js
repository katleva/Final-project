import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
    },
  });
};

export default getUserById;

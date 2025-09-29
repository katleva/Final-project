import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getBookingByUser = async (userId) => {
  return prisma.booking.findMany({
    where: { userId },
    include: { user: true }, // only include user; remove property if not in schema yet
  });
};

export default getBookingByUser;

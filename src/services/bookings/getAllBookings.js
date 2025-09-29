import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllBookings = async () => {
  return prisma.booking.findMany({
    include: { user: true },
  });
};

export default getAllBookings;

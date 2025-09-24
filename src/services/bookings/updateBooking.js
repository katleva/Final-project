import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const updateBooking = async (id, data) => {
  return prisma.booking.update({
    where: { id },
    data,
  });
};

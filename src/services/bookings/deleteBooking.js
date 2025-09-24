import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deleteBooking = async (id) => {
  return prisma.booking.delete({
    where: { id },
  });
};


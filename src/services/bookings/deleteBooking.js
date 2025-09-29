import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deleteBooking = async (id) => {
  const existingBooking = await prisma.booking.findUnique({ where: { id } });
  if (!existingBooking) return null;

  return prisma.booking.delete({ where: { id } });
};

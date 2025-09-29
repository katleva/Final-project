import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const updateBooking = async (id, data) => {
  const existingBooking = await prisma.booking.findUnique({ where: { id } });
  if (!existingBooking) return null;

  return prisma.booking.update({
    where: { id },
    data: {
      checkinDate: data.checkinDate ?? existingBooking.checkinDate,
      checkoutDate: data.checkoutDate ?? existingBooking.checkoutDate,
      numberOfGuests: data.numberOfGuests ?? existingBooking.numberOfGuests,
      totalPrice: data.totalPrice ?? existingBooking.totalPrice,
      bookingStatus: data.bookingStatus ?? existingBooking.bookingStatus,
    },
  });
};

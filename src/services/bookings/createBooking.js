import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createBooking = async (data) => {
  const { userId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = data;

  return prisma.booking.create({
    data: {
      userId,
      checkinDate: new Date(checkinDate),
      checkoutDate: new Date(checkoutDate),
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });
};

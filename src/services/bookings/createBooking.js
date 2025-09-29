import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createBooking = async ({
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
}) => {
  if (!userId || !propertyId || !checkinDate || !checkoutDate || !numberOfGuests || !totalPrice) {
    throw new Error("Missing required fields for booking");
  }

  return await prisma.booking.create({
    data: {
      checkinDate: new Date(checkinDate),
      checkoutDate: new Date(checkoutDate),
      numberOfGuests,
      totalPrice,
      bookingStatus: bookingStatus || "pending",
      user: { connect: { id: userId } },
      property: { connect: { id: propertyId } },
    },
  });
};

export default createBooking;

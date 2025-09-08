const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllBookings() {
  return prisma.booking.findMany({
    include: {
      user: true,
      property: true
    }
  });
}

async function getBookingById(id) {
  return prisma.booking.findUnique({
    where: { id: Number(id) },
    include: {
      user: true,
      property: true
    }
  });
}

async function createBooking(data) {
  return prisma.booking.create({ data });
}

async function updateBooking(id, data) {
  return prisma.booking.update({
    where: { id: Number(id) },
    data
  });
}

async function deleteBooking(id) {
  return prisma.booking.delete({
    where: { id: Number(id) }
  });
}

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
};

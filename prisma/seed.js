import { PrismaClient } from '@prisma/client';
import userData from '../src/data/users.json' with { type: 'json' };
import hostsData from '../src/data/hosts.json' with { type: 'json' };
import propertiesData from '../src/data/properties.json' with { type: 'json' };
import bookingsData from '../src/data/bookings.json' with { type: 'json' };
import reviewsData from '../src/data/reviews.json' with { type: 'json' };

const prisma = new PrismaClient();

async function main() {

  //users
  const { users } = userData;
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        username: user.username,
        password: user.password,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        pictureUrl: user.pictureUrl,
      },
    });
  }

  //hosts
  const { hosts } = hostsData;
  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: {
        id: host.id,
        username: host.username,
        password: host.password,
        name: host.name,
        email: host.email,
        phoneNumber: host.phoneNumber,
        pictureUrl: host.pictureUrl,
        aboutMe: host.aboutMe,
        listings: host.listings,
      },
    });
  }

  //properties
  const { properties } = propertiesData;
  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        id: property.id,
        hostId: property.hostId,
        title: property.title,
        description: property.description,
        location: property.location,
        pricePerNight: property.pricePerNight,
        bedroomCount: property.bedroomCount,
        bathRoomCount: property.bathRoomCount,
        maxGuestCount: property.maxGuestCount,
        rating: property.rating,
      },
    });
  }

  //bookings
  const { bookings } = bookingsData;
  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: {
        id: booking.id,
        userId: booking.userId,
        propertyId: booking.propertyId,
        checkinDate: new Date(booking.checkinDate),
        checkoutDate: new Date(booking.checkoutDate),
        numberOfGuests: booking.numberOfGuests,
        totalPrice: booking.totalPrice,
        bookingStatus: booking.bookingStatus,
      },
    });
  }

  //reviews
  const { reviews } = reviewsData;
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: {
        id: review.id,
        userId: review.userId,
        propertyId: review.propertyId,
        rating: review.rating,
        comment: review.comment,
      },
    });
  }
}

main().catch(e => console.error(e)).finally(async () => await prisma.$disconnect());

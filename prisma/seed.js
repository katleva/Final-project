import { PrismaClient } from '@prisma/client';
import userData from '../src/data/users.json' with { type: 'json' };
import propertyData from '../src/data/properties.json' with { type: 'json' };
import bookingData from '../src/data/bookings.json' with { type: 'json' };
import reviewData from '../src/data/reviews.json' with { type: 'json' };
import hostData from '../src/data/hosts.json' with { type: 'json' };

const prisma = new PrismaClient();

async function main() {

  console.log('Seeding hosts...');
  for (const host of hostData.hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
    console.log(`Seeded host: ${host.name} (${host.id})`);
  }

 
  console.log('Seeding users...');
  for (const user of userData.users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
    console.log(`Seeded user: ${user.username} (${user.id})`);
  }

 
  console.log('Seeding properties...');
  for (const property of propertyData.properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: property,
    });
    console.log(`Seeded property: ${property.title} (${property.id})`);
  }


  console.log('Seeding bookings...');
  for (const booking of bookingData.bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: {
        ...booking,
        checkinDate: new Date(booking.checkinDate),
        checkoutDate: new Date(booking.checkoutDate),
      },
    });
    console.log(`Seeded booking: ${booking.id}`);
  }


  console.log('Seeding reviews...');
  for (const review of reviewData.reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
    console.log(`Seeded review: ${review.id}`);
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

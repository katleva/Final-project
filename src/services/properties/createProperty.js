import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createProperty = async (data) => {
  const requiredFields = ["hostId", "title", "description", "location", "pricePerNight", "bedroomCount", "bathRoomCount", "maxGuestCount"];
  
  for (const field of requiredFields) {
    if (!data[field]) {
      const err = new Error(`Missing required field: ${field}`);
      err.statusCode = 400;
      throw err;
    }
  }

  return prisma.property.create({
    data: {
      hostId: data.hostId,
      title: data.title,
      description: data.description,
      location: data.location,
      pricePerNight: data.pricePerNight,
      bedroomCount: data.bedroomCount,
      bathRoomCount: data.bathRoomCount,
      maxGuestCount: data.maxGuestCount,
      rating: data.rating ?? 0,
    },
  });
};

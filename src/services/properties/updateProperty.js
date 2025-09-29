import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const updateProperty = async (id, data) => {
  const existing = await prisma.property.findUnique({ where: { id } });
  if (!existing) return null;

  return prisma.property.update({
    where: { id },
    data: {
      title: data.title ?? existing.title,
      description: data.description ?? existing.description,
      location: data.location ?? existing.location,
      pricePerNight: data.pricePerNight ?? existing.pricePerNight,
      bedroomCount: data.bedroomCount ?? existing.bedroomCount,
      bathRoomCount: data.bathRoomCount ?? existing.bathRoomCount,
      maxGuestCount: data.maxGuestCount ?? existing.maxGuestCount,
      rating: data.rating ?? existing.rating,
    },
  });
};

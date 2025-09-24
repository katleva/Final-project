import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createReview(data) {
  return await prisma.review.create({
    data: {
      rating: data.rating,
      comment: data.comment,
      userId: data.userId,
      propertyId: data.propertyId,
    },
  });
}

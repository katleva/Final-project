import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createReview(data) {
  const { rating, comment, userId, propertyId } = data;

  if (!rating || !comment || !userId || !propertyId) {
    throw new Error("All fields (rating, comment, userId, propertyId) are required");
  }

  return await prisma.review.create({
    data: {
      rating,
      comment,
      userId,
      propertyId,
    },
  });
}

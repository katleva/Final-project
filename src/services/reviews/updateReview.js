import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateReview(id, data) {
  return await prisma.review.update({
    where: { id },
    data: {
      rating: data.rating,
      comment: data.comment,
    },
  });
}

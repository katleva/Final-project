import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function updateReview(id, data) {
  const existingReview = await prisma.review.findUnique({ where: { id } });
  if (!existingReview) return null;

  return await prisma.review.update({
    where: { id },
    data: {
      rating: data.rating ?? existingReview.rating,
      comment: data.comment ?? existingReview.comment,
    },
  });
}

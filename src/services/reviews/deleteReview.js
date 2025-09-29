import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function deleteReview(id) {
  const existingReview = await prisma.review.findUnique({ where: { id } });
  if (!existingReview) return null;
  return await prisma.review.delete({ where: { id } });
}

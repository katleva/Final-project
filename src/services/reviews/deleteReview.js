import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteReview(id) {
  return await prisma.review.delete({
    where: { id },
  });
}

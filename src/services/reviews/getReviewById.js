import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getReviewById(id) {
  return await prisma.review.findUnique({
    where: { id },
    include: {
      user: true,
      property: true,
    },
  });
}

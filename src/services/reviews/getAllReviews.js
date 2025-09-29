import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getAllReviews() {
  return prisma.review.findMany({
    include: {
      property: true,
      user: true,
    },
  });
}

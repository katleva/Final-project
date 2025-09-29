import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getHostById(id) {
  return await prisma.host.findUnique({
    where: { id },
    include: {
      listings: true, // Include host's properties
    },
  });
}

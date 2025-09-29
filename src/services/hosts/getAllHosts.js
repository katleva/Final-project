import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getAllHosts(filters = {}) {
  try {
    const hosts = await prisma.host.findMany({ where: filters });
    return hosts;
  } catch (err) {
    console.error("getAllHosts error:", err);
    return []; // prevents 500 in the route
  }
}


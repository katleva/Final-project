import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createHost(data) {
  try {
    const host = await prisma.host.create({
      data: {
        username: data.username,
        password: data.password,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        pictureUrl: data.pictureUrl,
        aboutMe: data.aboutMe || "",
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        pictureUrl: true,
        aboutMe: true,
      },
    });
    console.log("Host created:", host.username);
    return host;
  } catch (err) {
    console.error("createHost error:", err);
    throw err;
  }
}

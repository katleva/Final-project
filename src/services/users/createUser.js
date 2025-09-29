import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUser(data) {
  try {
    const user = await prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        pictureUrl: data.pictureUrl,
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        pictureUrl: true
      }
    });
    console.log("User created:", user.username);
    return user;
  } catch (err) {
    console.error("createUser error:", err);
    throw err;
  }
}

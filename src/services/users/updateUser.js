import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateUser = async (id, data) => {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (!existingUser) return null;

  // Update the user
  return prisma.user.update({
    where: { id },
    data: {
      username: data.username ?? existingUser.username,
      name: data.name ?? existingUser.name,
      email: data.email ?? existingUser.email,
      phoneNumber: data.phoneNumber ?? existingUser.phoneNumber,
      pictureUrl: data.pictureUrl ?? existingUser.pictureUrl,
      password: data.password ?? existingUser.password,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
    },
  });
};

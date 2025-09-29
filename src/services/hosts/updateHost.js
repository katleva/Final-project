import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateHost(id, data) {
  const existingHost = await prisma.host.findUnique({ where: { id } });
  if (!existingHost) return null;

  return prisma.host.update({
    where: { id },
    data: {
      username: data.username ?? existingHost.username,
      password: data.password ?? existingHost.password,
      name: data.name ?? existingHost.name,
      email: data.email ?? existingHost.email,
      phoneNumber: data.phoneNumber ?? existingHost.phoneNumber,
      pictureUrl: data.pictureUrl ?? existingHost.pictureUrl,
      aboutMe: data.aboutMe ?? existingHost.aboutMe,
    },
  });
}

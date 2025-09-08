const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// Returns all hosts or returns a host with a specific name (e.g. John Doe)
async function getHosts(name) {
  if (name) {

    const host = await prisma.host.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    return host;
  }

  // No name filter → return all
  return prisma.host.findMany();
}

//Create a new host
async function createHost(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.host.create({
    data: {
      username: data.username,
      password: hashedPassword
    }
  });
}

//Returns a single host, updates it, or deletes it. id is the host’s id
async function getHostById(id) {
  return prisma.host.findUnique({
    where: { id: Number(id) },
    include: { listings: true }
  });
}

async function updateHost(id, data) {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return prisma.host.update({
    where: { id: Number(id) },
    data
  });
}

async function deleteHost(id) {
  return prisma.host.delete({ where: { id: Number(id) } });
}

module.exports = {
  getAllHosts,
  getHostById,
  createHost,
  updateHost,
  deleteHost,
  getHosts, 
};

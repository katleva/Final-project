import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Returns all users and their information
export async function getAllUsers() {
  return prisma.user.findMany({
    select: {
      password: false,
      id: true,
      username: true,
      email: true,
      name: true,
      phoneNumber: true,
      pictureUrl: true,
    },
  });
}

// Create a new user
export async function createUser(userData) {
  return prisma.user.create({ data: userData });
}

// Returns a single user. id is the user's id
export async function getUserById(req, res, next) {
  const userId = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        pictureUrl: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: `User with id '${userId}' not found` });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

// Updates user
export async function updateUser(req, res, next) {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!existingUser) {
      return res.status(404).json({ message: `User with id '${userId}' not found` });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        pictureUrl: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
}

// Deletes user
export async function deleteUser(req, res, next) {
  const userId = req.params.id;

  try {
    const existingUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!existingUser) {
      return res.status(404).json({ message: `User with id '${userId}' not found` });
    }

    await prisma.user.delete({ where: { id: userId } });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

// Returns a user with a specific username (e.g. jdoe)
export async function getUserByUsername(req, res, next) {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        pictureUrl: true,
        // exclude password for security reasons
      },
    });

    if (!user) {
      return res.status(404).json({ message: `User with username '${username}' not found` });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

//Returns a user with a specific e-mailadres (e.g. johndoe@example.com)
export async function getUserByEmail(req, res, next) {
  const userEmail = req.query.email;
  if (!userEmail) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user2 = await prisma.user.findUnique({
      where: { userEmail },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        pictureUrl: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: `User with this email not found` });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}
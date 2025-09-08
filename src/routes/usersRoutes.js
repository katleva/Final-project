import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

//Returns all users and their information. 
router.get('/', async (req, res, next) => {
  const { email, username } = req.query;

  //Returns a user with a specific e-mailadres (e.g. johndoe@example.com)
  try {
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          phoneNumber: true,
          pictureUrl: true,
        },
      });

      if (!user) return res.status(404).json({ message: 'User not found' });

      return res.json(user);
    }

    //Returns a user with a specific username (e.g. jdoe)
    if (username) {
      const user = await prisma.user.findUnique({
        where: { username },
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          phoneNumber: true,
          pictureUrl: true,
        },
      });

      if (!user) return res.status(404).json({ message: 'User not found' });

      return res.json(user);
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        pictureUrl: true,
      },
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
});

//Returns a single user, updates it, or deletes it. id is the user's id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        pictureUrl: true,
      },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    next(error);
  }
});

//Create a new user
router.post('/', async (req, res, next) => {
  const { username, name, email, password, phoneNumber, pictureUrl } = req.body;

  if (!username || !name || !email || !password) {
    return res.status(400).json({ message: 'Username, name, email and password are required' });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        name,
        email,
        password,
        phoneNumber: phoneNumber || '',
        pictureUrl: pictureUrl || '',
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

    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'User with this email or username already exists' });
    }
    next(error);
  }
});


//Updates a user
router.put('/:id', async (req, res, next) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: req.body,
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
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'User not found' });
    }
    next(error);
  }
});

//Deletes a user
import { validate as isUuid } from 'uuid';

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  if (!id || !isUuid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
      select: { id: true, username: true, name: true, email: true, phoneNumber: true, pictureUrl: true },
    });

    res.status(200).json(deletedUser);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'User not found' });
    }
    next(error);
  }
});


export default router;
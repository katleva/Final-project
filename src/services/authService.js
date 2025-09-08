import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';

export async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // find the user or host
    const user = await prisma.user.findUnique({ where: { username } });
    const host = await prisma.host.findUnique({ where: { username } });

    const account = user || host;

    if (!account || account.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // token payload
    const payload = {
      id: account.id,
      username: account.username
    };

    // sign JWT using the correct secret key
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

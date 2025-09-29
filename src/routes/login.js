import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    if (user.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;


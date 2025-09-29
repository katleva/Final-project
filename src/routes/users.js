import { Router } from "express";
import getUsers from "../services/users/getAllUsers.js";
import { createUser } from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import { updateUser } from "../services/users/updateUser.js"; // named export
import { deleteUser } from "../services/users/deleteUser.js"; // named export
import { getUserByUsername } from "../services/users/getUserByUsername.js";
import { getUserByEmail } from "../services/users/getUserByEmail.js";
import winston from "winston";

const { error } = winston;

const router = Router();

// GET all users or filter by username/email
router.get("/", async (req, res, next) => {
  try {
    const { username, email } = req.query;

    if (username) {
      const user = await getUserByUsername(username);
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.json(user);
    }

    if (email) {
      const user = await getUserByEmail(email);
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.json(user);
    }

    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// POST create new user
router.post("/", async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, pictureUrl } = req.body;

    // Validate required fields
    if (!username || !password || !name || !email || !phoneNumber || !pictureUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the user
    const newUser = await createUser({ username, password, name, email, phoneNumber, pictureUrl });

    console.log(`User created: ${newUser.username}`);

    // Respond with 201 and user info
    res.status(201).json(newUser);
  } catch (error) {
    // Handle unique constraint violation (duplicate username)
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Username already exists" });
    }
    console.error("Create user error:", error);
    next(error);
  }
});


// GET user by ID
router.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// PUT update user by ID
router.put("/:id", async (req, res, next) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found"})
    }
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// DELETE user by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedUser = await deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;

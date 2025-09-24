import { Router } from "express";
import getUsers from "../services/users/getAllUsers.js";
import createUser  from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import { updateUser } from "../services/users/updateUser.js";
import { deleteUser } from "../services/users/deleteUser.js";
import { getUserByUsername } from "../services/users/getUserByUsername.js";
import { getUserByEmail } from "../services/users/getUserByEmail.js";

const router = Router();

// Return all users or filter by username/email
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

// Post new user
router.post("/", async (req, res, next) => {
  try {
    const { username, name, password, email, phoneNumber, image } = req.body;

    const newUser = await createUser({
      username,
      name,
      password,
      email,
      phoneNumber,
      pictureUrl: image
    });

    console.log(`User created successfully: ${newUser.username}`);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Create user route error:", error);
    res.status(500).json({ message: error.message || "Something went wrong!" });
  }
});


// Get user by id
router.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Update user
router.put("/:id", async (req, res, next) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// Delete user
router.delete("/:id", async (req, res, next) => {
  try {
    await deleteUser(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
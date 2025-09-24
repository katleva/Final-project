import { Router } from "express";
import getAllHosts from "../services/hosts/getAllHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import { createHost } from "../services/hosts/createHost.js";
import { updateHost } from "../services/hosts/updateHost.js";
import { deleteHost } from "../services/hosts/deleteHost.js";

const router = Router();

// GET all hosts or filter by name
router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    console.log("Getting hosts with filter:", name);

    const filters = {};
    if (name) filters.name = name;

    const hosts = await getAllHosts(filters);
    console.log("Hosts fetched:", hosts);

    res.json(hosts);
  } catch (err) {
    console.error("Error fetching hosts:", err);
    res.status(500).json({ message: "Something went wrong!" });
  }
});


// GET host by ID
router.get("/:id", async (req, res, next) => {
  try {
    const host = await getHostById(req.params.id);
    if (!host) return res.status(404).json({ message: "Host not found" });
    res.json(host);
  } catch (err) {
    next(err);
  }
});

// POST new host
router.post("/", async (req, res, next) => {
  try {
    const newHost = await createHost(req.body);
    res.status(201).json(newHost);
  } catch (err) {
    next(err);
  }
});

// PUT update host
router.put("/:id", async (req, res, next) => {
  try {
    const updatedHost = await updateHost(req.params.id, req.body);
    res.json(updatedHost);
  } catch (err) {
    next(err);
  }
});

// DELETE host
router.delete("/:id", async (req, res, next) => {
  try {
    await deleteHost(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;

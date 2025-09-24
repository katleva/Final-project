import { Router } from "express";
import getAllProperties from "../services/properties/getAllProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import { createProperty } from "../services/properties/createProperty.js";
import { updateProperty } from "../services/properties/updateProperty.js";
import { deleteProperty } from "../services/properties/deleteProperty.js";

const router = Router();

// GET all properties or filter
router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight } = req.query;
    const filters = {};
    if (location) filters.location = location;
    if (pricePerNight) filters.pricePerNight = Number(pricePerNight);

    const properties = await getAllProperties(filters);
    res.json(properties);
  } catch (err) {
    next(err);
  }
});

// GET property by ID
router.get("/:id", async (req, res, next) => {
  try {
    const property = await getPropertyById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    next(err);
  }
});

// POST new property
router.post("/", async (req, res, next) => {
  try {
    const newProperty = await createProperty(req.body);
    res.status(201).json(newProperty);
  } catch (err) {
    next(err);
  }
});

// PUT update property
router.put("/:id", async (req, res, next) => {
  try {
    const updatedProperty = await updateProperty(req.params.id, req.body);
    res.json(updatedProperty);
  } catch (err) {
    next(err);
  }
});

// DELETE property
router.delete("/:id", async (req, res, next) => {
  try {
    await deleteProperty(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;

import { Router } from "express";
import getAllReviews from "../services/reviews/getAllReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import { createReview } from "../services/reviews/createReview.js";
import { updateReview } from "../services/reviews/updateReview.js";
import { deleteReview } from "../services/reviews/deleteReview.js";

const router = Router();

// GET all reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

// GET review by ID
router.get("/:id", async (req, res, next) => {
  try {
    const review = await getReviewById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (err) {
    next(err);
  }
});

// POST new review
router.post("/", async (req, res, next) => {
  try {
    const newReview = await createReview(req.body);
    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
});

// PUT update review
router.put("/:id", async (req, res, next) => {
  try {
    const updatedReview = await updateReview(req.params.id, req.body);
    res.json(updatedReview);
  } catch (err) {
    next(err);
  }
});

// DELETE review
router.delete("/:id", async (req, res, next) => {
  try {
    await deleteReview(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;

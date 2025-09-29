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
    const { rating, comment, userId, propertyId } = req.body;
    if (!rating || !comment || !userId || !propertyId) {
      return res.status(400).json({ message: "rating, comment, userId, and propertyId are required" });
    }

    const newReview = await createReview(req.body);
    res.status(201).json(newReview);
  } catch (err) {
    console.error("Create review error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// PUT update review
router.put("/:id", async (req, res, next) => {
  try {
    const updatedReview = await updateReview(req.params.id, req.body);
    if (!updatedReview) return res.status(404).json({ message: "Review not found" });
    res.json(updatedReview);
  } catch (err) {
    console.error("Update review error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// DELETE review
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedReview = await deleteReview(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete review error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});
export default router;

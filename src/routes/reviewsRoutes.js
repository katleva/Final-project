import express from 'express';
import reviewsData from '../data/reviews.json' with { type: 'json' };

const router = express.Router();

let reviews = reviewsData.reviews;

// Returns all reviews
router.get('/', (req, res) => {
  res.json(reviews);
});

// Returns a single review
router.get('/:id', (req, res) => {
  const review = reviews.find(r => r.id === req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  res.json(review);
});

// Create a new review
router.post('/', (req, res) => {
  const newReview = { id: Date.now().toString(), ...req.body };
  reviews.push(newReview);
  res.status(201).json(newReview);
});

// Update review
router.put('/:id', (req, res) => {
  const index = reviews.findIndex(r => r.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Review not found' });

  reviews[index] = { ...reviews[index], ...req.body };
  res.json(reviews[index]);
});

// Delete review
router.delete('/:id', (req, res) => {
  const index = reviews.findIndex(r => r.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Review not found' });

  reviews.splice(index, 1);
  res.json({ message: 'Review deleted' });
});

export default router;

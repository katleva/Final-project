const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Returns all reviews
async function getAllReviews() {
  return prisma.review.findMany({
    include: {
      user: true,
      property: true
    }
  });
}

// Returns a single review, updates it, or deletes it. id is the review’s id
async function getReviewById(id) {
  return prisma.review.findUnique({
    where: { id: Number(id) },
    include: {
      user: true,
      property: true
    }
  });
}

// Create a new review
async function createReview(data) {
  return prisma.review.create({ data });
}

// Update a review
async function updateReview(id, data) {
  return prisma.review.update({
    where: { id: Number(id) },
    data
  });
}

// Delete a review
async function deleteReview(id) {
  return prisma.review.delete({
    where: { id: Number(id) }
  });
}

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};

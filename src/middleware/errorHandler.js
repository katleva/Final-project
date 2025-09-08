export function errorHandler(err, req, res, next) {
  console.error(err);

  // Prisma record not found
  if (err.code === 'P2025') {
    return res.status(404).json({ message: 'User not found' });
  }

  // Prisma unique constraint violation
  if (err.code === 'P2002') {
    return res.status(409).json({ message: 'User already exists' });
  }

  // Default fallback for unknown errors
  res.status(500).json({ message: 'An error occurred on the server' });
}

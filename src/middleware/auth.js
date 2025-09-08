import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  if (req.method === 'GET') {
    return next();
  }

  const token = req.headers.authorization
  const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';

  if (!token) {
    return res.status(401).json({ message: 'Token missing!' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token!' });
    }

    req.user = decoded;
    next();
  });
};
import express from "express";
import { authMiddleware } from './middleware/auth.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import hostsRoutes from "./routes/hostsRoutes.js";
import propertiesRoutes from './routes/propertiesRoutes.js';
import bookingsRoutes from "./routes/bookingsRoutes.js";
import reviewsRoutes from "./routes/reviewsRoutes.js";

const app = express();

app.use(express.json());
app.use(logger);
app.use((req, res, next) => {
  if (
    req.path === '/login' ||
    (req.path === '/users' && req.method === 'POST')
  ) {
    return next();
  }
  authMiddleware(req, res, next);
});


app.use('/login', authRoutes);
app.use('/users', usersRoutes);
app.use('/hosts', hostsRoutes);
app.use('/properties', propertiesRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/reviews', reviewsRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

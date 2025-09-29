import express from "express";
import './instrument.js';
import { PrismaClient } from "@prisma/client";
import usersRouter from "./routes/users.js";
import bookingsRouter from "./routes/bookings.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/reviews.js";
import hostsRouter from "./routes/hosts.js";
import authRouter from "./routes/login.js";
import logMiddleware from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";


const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(logMiddleware);

app.use("/login", authRouter);

app.use("/users", usersRouter);
app.use("/bookings", bookingsRouter);   
app.use("/properties", propertiesRouter); 
app.use("/reviews", reviewsRouter);
app.use("/hosts", hostsRouter);       

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

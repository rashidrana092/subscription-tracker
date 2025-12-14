import express from "express";
const app = express();
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

app.use(express.json()); // to handle json data sent in request or API request
app.use(express.urlencoded({ extended: false })); // to process form data  sent by HTML forms in simple format
app.use(cookieParser()); // reads cookies from incoming request so app can store data
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subcriptions", subscriptionRouter);
app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.send("Welcome to Subscription Tracker API");
});

app.listen(PORT, async () => {
  console.log(
    `Subscription Tracker API is running on http://localhost:${PORT}`
  );
  await connectToDatabase();
});

export default app;

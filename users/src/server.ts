import dotenv from "dotenv";
import express from "express";
import { Connect } from "./database/connection/index.js";
import eventConsumer from "./events/consumer.js";
import { errorMiddleware } from "@carreralink/common";
import cors from "cors";
import { adminRouter, userRouter } from "./routes/index.js";

const app = express();
dotenv.config();

Connect(process.env.MONGO_URL!);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("*", (req, res, next) => {
  console.log(req.originalUrl);
  next();
});

app.get("/api/v1/users/check", (_, res) => {
  res.send(`Users server is up and running`);
});

app.use("/api/v1/users/admin", adminRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res) => {
  res.send(`${req.originalUrl} not found in users server.`);
});
// @ts-ignore
app.use(errorMiddleware);

process.on("uncaughtException", (error) => {
  console.log(error);
});

app.listen(5000, () => {
  console.log(`Users server is running on : http://localhost:5000`);
  eventConsumer();
});

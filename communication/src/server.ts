import dotenv from "dotenv";
import express from "express";
import { errorMiddleware } from "@carreralink/common";
import cors from "cors";
import { Connect } from "./database/config/index.js";
import eventConsumer from "./events/consumer/consumer.js";

const port = 8000;
dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Connect(process.env.MONGO_URL!);

app.all("*", (req, res, next) => {
  console.log(req.originalUrl);
  next();
});

app.get("/api/v1/communication/check", (_, res) => {
  res.send(`Communication server is up and running`);
});

app.all("*", (req, res) => {
  res.send(`${req.originalUrl} not found in Communication server.`);
});

app.use(errorMiddleware);

// listening
app.listen(port, () => {
  console.log(`Ai server is running on : http://localhost:${port}`);
  eventConsumer();
});

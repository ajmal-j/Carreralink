import dotenv from "dotenv";
import express from "express";
import { Connect } from "./database/connection/index.js";
import AuthRouter from "./routes/index.js";
import { errorMiddleware } from "@carreralink/common";
import cors from "cors";
import cookieParser from "cookie-parser";
import KafkaConsumer from "./events/consumer.js";

const port = 4000;
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
app.use(cookieParser());

Connect(process.env.MONGO_URL!);

app.all("*", (req, res, next) => {
  console.log(req.originalUrl);
  next();
});

app.use("/api/v1/auth", AuthRouter);

app.get("/api/v1/auth/check", (_, res) => {
  res.send(`Auth server is up and running`);
});

app.all("*", (req, res) => {
  res.send(`${req.originalUrl} not found in auth server.`);
});

app.use(errorMiddleware);
// listening
app.listen(port, () => {
  console.log(`Auth server is running on : http://localhost:${port}`);
  KafkaConsumer();
});

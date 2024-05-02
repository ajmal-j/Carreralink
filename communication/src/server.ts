import { errorMiddleware } from "@carreralink/common";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Connect } from "./database/config/index.js";
import { Socket } from "./entities/socket.js";
import eventConsumer from "./events/consumer/consumer.js";
import { chatRoutes } from "./routes/index.js";

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

// listening
const server = app.listen(port, () => {
  console.log(`Ai server is running on : http://localhost:${port}`);
  eventConsumer();
});

// socket io initialization
const socket = new Socket();

socket.io.attach(server);

socket.listenForChat();
socket.listenForInterview();

app.all("*", (req, res, next) => {
  console.log(req.originalUrl);
  next();
});

app.get("/api/v1/communication/check", (_, res) => {
  res.send(`Communication server is up and running`);
});

app.use("/api/v1/communication/chat", chatRoutes);

app.all("*", (req, res) => {
  res.send(`${req.originalUrl} not found in Communication server.`);
});

// @ts-expect-error
app.use(errorMiddleware);

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

let origin: string = process.env.CLIENT_URL!;
const isProduction = process.env.IS_PRODUCTION;

if (isProduction) {
  const productionUrl = process.env.PRODUCTION_URL!;
  origin = productionUrl ? productionUrl : origin;
}

app.use(
  cors({
    origin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Connect(process.env.MONGO_URL!);

// listening
app.listen(port, () => {
  console.log(`Ai server is running on : http://localhost:${port}`);
  eventConsumer();
});

// socket io initialization
const socket = new Socket();

const socketServer = express().listen(4040, () => {
  console.log(`Socket server is running on : http://localhost:4040`);
});

socket.io.attach(socketServer);

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

app.use(errorMiddleware);

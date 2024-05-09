import dotenv from "dotenv";
import express from "express";
import { errorMiddleware } from "@carreralink/common";
import cors from "cors";
import { AiRoutes } from "./routes/index.js";
import eventConsumer from "./events/consumer/index.js";

const port = 7000;
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

app.all("*", (req, res, next) => {
  console.log(req.originalUrl);
  next();
});

app.get("/api/v1/ai/check", (_, res) => {
  res.send(`Ai server is up and running`);
});

app.use("/api/v1/ai", AiRoutes);

app.all("*", (req, res) => {
  res.send(`${req.originalUrl} not found in ai server.`);
});

app.use(errorMiddleware);

// listening
app.listen(port, () => {
  console.log(`Ai server is running on : http://localhost:${port}`);
  eventConsumer();
});

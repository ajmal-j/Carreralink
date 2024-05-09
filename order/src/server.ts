import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Connect } from "./database/connection/index.js";
import { errorMiddleware } from "@carreralink/common";
import cors from "cors";
import { orderRoutes, paymentRoutes } from "./routes/index.js";

const app = express();
const port = 10000;

Connect(process.env.MONGO_URL!);

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

app.get("/api/v1/order/check", (_, res) => {
  res.send(`Order server is up and running`);
});

app.use("/api/v1/order/payment", paymentRoutes);
app.use("/api/v1/order", orderRoutes);

app.all("*", (req, res) => {
  console.log(req.url);
  res.send(`${req.originalUrl} not found in order server.`);
});

app.use(errorMiddleware);

process.on("uncaughtException", (error) => {
  console.log(error);
});

app.listen(port, () => {
  console.log(`Order server is running on : http://localhost:${port}`);
});

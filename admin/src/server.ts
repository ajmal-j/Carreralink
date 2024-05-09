import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Connect } from "./database/connection/index.js";
import { errorMiddleware } from "@carreralink/common";
import cors from "cors";
import {
  adminPlanRoutes,
  skillAndCategoryRoutes,
  userPlanRoutes,
} from "./routes/index.js";

const app = express();
const port = 9000;

Connect(process.env.MONGO_URL!);

let origin: string = process.env.CLIENT_URL!;
const isProduction = process.env.IS_PRODUCTION;

if (isProduction) {
  const productionUrl = process.env.PRODUCTION_URL!;
  origin = productionUrl ? productionUrl : origin;
}

console.log(origin);

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

app.get("/api/v1/admin/check", (_, res) => {
  res.send(`Admin server is up and running`);
});

app.use("/api/v1/admin/skillAndCategory", skillAndCategoryRoutes);
app.use("/api/v1/admin/plan/user", userPlanRoutes);
app.use("/api/v1/admin/plan", adminPlanRoutes);

app.all("*", (req, res) => {
  console.log(req.url);
  res.send(`${req.originalUrl} not found in company server.`);
});

app.use(errorMiddleware);

process.on("uncaughtException", (error) => {
  console.log(error);
});

app.listen(port, () => {
  console.log(`Admin server is running on : http://localhost:${port}`);
});

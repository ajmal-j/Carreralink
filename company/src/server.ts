import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Connect } from "./database/connection/index.js";
import eventConsumer from "./events/consumers/consumer.js";
import { errorMiddleware } from "@carreralink/common";
import cors from "cors";
import {
  adminRoutes,
  companyRoutes,
  interviewRoutes,
  jobsRoutes,
  recruiterRoutes,
} from "./routes/index.js";

const app = express();

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
  console.log(req.method, "-", req.originalUrl);
  next();
});

app.get("/api/v1/company/check", (_, res) => {
  res.send(`Company server is up and running`);
});

app.use("/api/v1/company/jobs", jobsRoutes);
app.use("/api/v1/company/interview", interviewRoutes);
app.use("/api/v1/company/recruiter", recruiterRoutes);
app.use("/api/v1/company/admin", adminRoutes);
app.use("/api/v1/company", companyRoutes);

app.all("*", (req, res) => {
  res.send(`${req.originalUrl} not found in company server.`);
});

app.use(errorMiddleware);

process.on("uncaughtException", (error) => {
  console.log(error);
});

app.listen(8080, () => {
  console.log(`Company server is running on : http://localhost:8080`);
  eventConsumer();
});

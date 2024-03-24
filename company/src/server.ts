import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Connect } from "./database/connection/index.js";
import eventConsumer from "./events/consumer.js";
import { errorMiddleware } from "@carreralink/common";
import cors from "cors";
import { adminRoutes, companyRoutes, jobsRoutes } from "./routes/index.js";

const app = express();

Connect(process.env.MONGO_URL!);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/companies/check", (_, res) => {
  res.send(`Company server is up and running`);
});

app.use("/api/v1/companies/jobs", jobsRoutes);
app.use("/api/v1/companies/admin", adminRoutes);
app.use("/api/v1/companies", companyRoutes);

app.all("*", (req, res) => {
  res.send(`${req.originalUrl} not found in company server.`);
});

// @ts-ignore
app.use(errorMiddleware);

process.on("uncaughtException", (error) => {
  console.log(error);
});

app.listen(8080, () => {
  console.log(`Company server is running on : http://localhost:8080`);
  eventConsumer();
});

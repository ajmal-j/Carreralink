import dotenv from "dotenv";
import express from "express";
import { errorMiddleware } from "@carreralink/common";
import cors from "cors";
import { AiRoutes } from "./routes/index.js";

const port = 7000;
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
});
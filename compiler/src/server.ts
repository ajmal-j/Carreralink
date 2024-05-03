import { errorMiddleware } from "@carreralink/common";
import cors from "cors";
import express from "express";
import { compilerRoutes } from "./routes/index.js";

const port = 11000;

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

app.use("/api/v1/compiler", compilerRoutes);

app.all("*", (req, res) => {
  res.send(`${req.originalUrl} not found in compiler server.`);
});

app.use(errorMiddleware);

// listening
app.listen(port, () => {
  console.log(`Compiler server is running on : http://localhost:${port}`);
});

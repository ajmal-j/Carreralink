require("dotenv").config();
import express from "express";
import { Connect } from "./database/connection";

const app = express();

Connect(process.env.MONGO_URL!);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/users/check", (_, res) => {
  res.send(`Users server is up and running`);
});

app.all("*", (req, res) => {
  res.send(`${req.originalUrl} not found in users server.`);
});

app.listen(5000, () => {
  console.log(`Users server is running on : http://localhost:5000`);
});

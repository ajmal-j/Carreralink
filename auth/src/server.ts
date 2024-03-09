import dotenv from "dotenv";
import express from "express";
import { Connect } from "./database/connection/index.js";
import AuthRouter from "./routes/index.js";

const port = 4000;
dotenv.config()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Connect(process.env.MONGO_URL!);


app.use("/api/v1/auth", AuthRouter);

app.get("/api/v1/auth/check", (_, res) => {
  res.send(`Auth server is up and running`);
});

app.all("*", (req, res) => {
  res.send(`${req.originalUrl} not found in auth server.`);
});

// listening
app.listen(port, () => {
  console.log(`Auth server is running on : http://localhost:${port}`);
});

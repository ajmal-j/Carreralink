require("dotenv").config();
import express from "express";
const port = 4000 ?? process.env.PORT;
const app = express();

app.get("/check", (req, res) => {
  res.send(`Server is up and running ${process.env.MONGO_URL}`);
});

app.get("/", (req, res) => {
  console.log("auth server is up and running");
  res.send("Auth server is up and running");
});

// listening
app.listen(port, () => {
  console.log(`Auth server is running on : http://localhost:${port}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const port = 4000 !== null && 4000 !== void 0 ? 4000 : process.env.PORT;
const app = (0, express_1.default)();
app.get("/check", (req, res) => {
    res.send(`Server is up and running ${process.env.MONGO_URL}`);
});
// listening
app.listen(port, () => {
    console.log(`Running server on : http://localhost:${port}`);
});

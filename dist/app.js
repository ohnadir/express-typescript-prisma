"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import { connectDb } from "./config";
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// config dot env file
dotenv_1.default.config();
//database with database
// connectDb();
app.use('/authentication', routes_1.authenticationRouter);
app.use('/user', routes_1.userRouter);
app.get('/', (req, res) => {
    res.send("Hello world !");
});
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server app Listing at http://localhost:${PORT}`);
});

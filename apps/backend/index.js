import express from "express";
import router from "./src/routes/routes.js";
import dotenv from "dotenv";
import cors from "cors";
import { authenticateToken } from "./src/controllers/users.js";

const app = express();

const port = 8080;
app.use(cors());
app.use(express.json());
dotenv.config();
app.use(["/scooter", "/"], authenticateToken);
app.use(router);
app.listen(port);

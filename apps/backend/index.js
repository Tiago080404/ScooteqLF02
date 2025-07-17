import express from "express";
import router from "./src/routes/routes.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authenticateToken } from "./src/controllers/users.js";

const app = express();

const port = 8080;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

dotenv.config();
app.use(["/scooter", "/"], authenticateToken);
app.use(router);
app.listen(8080, () => {
  console.log(" Server läuft auf http://localhost:8080");
});

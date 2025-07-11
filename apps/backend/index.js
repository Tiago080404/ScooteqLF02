import express from "express";
import router from "./src/routes/routes.js";
const app = express();

const port = 8080;

app.use(express.json());
app.use(router);

app.listen(port);

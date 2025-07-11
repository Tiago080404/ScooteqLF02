import { getAllUsers } from "../controllers/users.js";
import { changeStatus } from "../controllers/scooters.js";
import express from "express";

const router = express.Router();

//get everthing
router.get("/", getAllUsers);

router.patch("/scooter", changeStatus);

export default router;

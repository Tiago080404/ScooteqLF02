import { getAllUsers, authUser, userLogin } from "../controllers/users.js";
import { changeStatus } from "../controllers/scooters.js";
import express from "express";

const router = express.Router();

//get everthing
router.get("/", getAllUsers);

router.patch("/scooter", changeStatus);

//users
router.post("/auth", authUser);
router.post("/login", userLogin);
export default router;

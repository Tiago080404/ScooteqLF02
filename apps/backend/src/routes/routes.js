import {
  getAllUsers,
  authUser,
  userLogin,
  checkCurrentLoggedInUser,
  updateRole,
} from "../controllers/users.js";
import { changeStatus, getAllScooters } from "../controllers/scooters.js";
import express from "express";

const router = express.Router();

//get everything
router.get("/", getAllUsers);

//scooters
router.get("/scooter", getAllScooters);
router.patch("/scooter", changeStatus);

//users
router.post("/auth", authUser);
router.post("/login", userLogin);
router.get("/auth", checkCurrentLoggedInUser);
router.patch("/users/:username", updateRole);
export default router;

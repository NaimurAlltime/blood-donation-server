import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/donor-list", userController.getAllFromDB);

router.post("/register", userController.createUser);

export const userRoutes = router;

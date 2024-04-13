import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/donor-list", userController.getAllFromDB);

router.get("/my-profile", auth, userController.getMyProfile);

router.post("/register", userController.createUser);

router.put("/my-profile", auth, userController.updateMyProfile);

export const userRoutes = router;

import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = express.Router();

router.get("/donor-list", userController.getAllFromDB);

router.get("/my-profile", auth, userController.getMyProfile);

router.post(
  "/register",
  validateRequest(UserValidations.createUserValidationSchema),
  userController.createUser
);

router.put(
  "/my-profile",
  auth,
  validateRequest(UserValidations.updateProfileValidationSchema),
  userController.updateMyProfile
);

export const userRoutes = router;

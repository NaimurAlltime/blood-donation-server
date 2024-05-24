import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";
import userRoles from "../../../shared/userRoles";

const router = express.Router();

router.get("/donor-list", userController.getAllFromDB);

router.get(
  "/my-profile",
  auth(userRoles.ADMIN, userRoles.USER),
  userController.getMyProfile
);

router.post(
  "/register",
  validateRequest(UserValidations.createUserValidationSchema),
  userController.createUser
);

router.put(
  "/my-profile",
  auth(userRoles.ADMIN, userRoles.USER),
  validateRequest(UserValidations.updateProfileValidationSchema),
  userController.updateMyProfile
);

export const userRoutes = router;

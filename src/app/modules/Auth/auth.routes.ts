import express from "express";
import { AuthController } from "./auth.controller";
import userRoles from "../../../shared/userRoles";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post("/login", AuthController.loginUser);
router.post(
  "/change-password",
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(userRoles.ADMIN, userRoles.USER),
  AuthController.changePassword
);

export const AuthRoutes = router;

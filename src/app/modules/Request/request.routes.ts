import express from "express";
import { RequestController } from "./request.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/donation-request", auth(), RequestController.requestDonation);

export const RequestRoutes = router;

import express from "express";
import { RequestController } from "./request.controller";

const router = express.Router();

router.post("/donation-request", RequestController.requestDonation);

export const RequestRoutes = router;

import express from "express";
import { RequestController } from "./request.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/donation-request", auth(), RequestController.getAlDonationRequest);

router.post("/donation-request", auth(), RequestController.requestDonation);

router.put(
  "/donation-request/:requestId",
  auth(),
  RequestController.updateRequestStatus
);

export const RequestRoutes = router;

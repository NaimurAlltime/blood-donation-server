import express from "express";
import { RequestController } from "./request.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { requestValidation } from "./request.validation";

const router = express.Router();

router.get("/donation-request", auth, RequestController.getAlDonationRequest);

router.post("/donation-request", auth, RequestController.requestDonation);

router.put(
  "/donation-request/:requestId",
  auth,
  validateRequest(requestValidation.updateStatus),
  RequestController.updateRequestStatus
);

export const RequestRoutes = router;

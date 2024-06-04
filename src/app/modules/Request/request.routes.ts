import express from "express";
import { RequestController } from "./request.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { requestValidation } from "./request.validation";

const router = express.Router();

router.get("/donation-request", auth(), RequestController.getAlDonationRequest);
router.get("/my-donation-request", auth(), RequestController.getMyAllRequest);

router.post(
  "/donation-request",
  auth(),
  validateRequest(requestValidation.createRequestValidationSchema),
  RequestController.requestDonation
);

router.patch(
  "/donation-request/:id",
  auth(),
  RequestController.updateRequestStatus
);

// router.patch(
//   "/donation-request/:id",
//   auth(),
//   RequestController.acceptDonationRequest
// );

export const RequestRoutes = router;

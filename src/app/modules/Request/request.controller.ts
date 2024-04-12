import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { RequestService } from "./request.service";
import prisma from "../../../shared/prisma";
import { CLIENT_RENEG_LIMIT } from "tls";

const requestDonation = catchAsync(async (req: Request, res: Response) => {
  const result = await RequestService.createRequesDonation(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Request successfully made",
    data: result,
  });
});

const getAlDonationRequest = catchAsync(async (req, res) => {
  const result = await RequestService.getAlDonationRequest(
    (req as any).user.id
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donation requests retrieved successfully",
    data: result,
  });
});

const updateRequestStatus = catchAsync(async (req: Request, res: Response) => {
  const { requestId } = req.params;

  const result = await RequestService.updateRequestStatus(requestId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donation request status successfully updated",
    data: result,
  });
});

export const RequestController = {
  requestDonation,
  getAlDonationRequest,
  updateRequestStatus,
};

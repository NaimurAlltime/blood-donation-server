import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { RequestService } from "./request.service";

const requestDonation = catchAsync(async (req, res) => {
  const { id } = (req as any).user;

  const result = await RequestService.createRequesDonation(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Request successfully made",
    data: result,
  });
});

const getAlDonationRequest = catchAsync(async (req, res) => {
  const { id } = (req as any).user;

  const result = await RequestService.getAlDonationRequest(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donation requests retrieved successfully",
    data: result,
  });
});

const getMyAllRequest = catchAsync(async (req, res) => {
  const { id } = (req as any).user;

  const result = await RequestService.getMyRequests(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My requests retrieved successfully",
    data: result,
  });
});

const updateRequestStatus = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await RequestService.updateRequestStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donation request status successfully updated",
    data: result,
  });
});

const acceptDonationRequest = catchAsync(async (req, res) => {
  const { requestId } = req.params;

  const result = await RequestService.acceptDonationRequest(
    requestId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donation Request accepted!",
    data: result,
  });
});

export const RequestController = {
  requestDonation,
  getAlDonationRequest,
  getMyAllRequest,
  updateRequestStatus,
  acceptDonationRequest,
};

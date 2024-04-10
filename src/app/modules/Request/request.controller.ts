import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthServices } from "./request.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const requestDonation = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Request successfully made",
    data: result,
  });
});

export const RequestController = {
  requestDonation,
};

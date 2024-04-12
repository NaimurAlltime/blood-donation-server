import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { RequestService } from "./request.service";
import prisma from "../../../shared/prisma";

const requestDonation = catchAsync(async (req: Request, res: Response) => {
  const result = await RequestService.createRequesDonation(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Request successfully made",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  // const user = await prisma.user.findUnique({
  //   where: {
  //     username: req.user.username,
  //   },
  // });

  const result = await RequestService.getAllFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donation requests retrieved successfully",
    data: result,
  });
});

export const RequestController = {
  requestDonation,
  getAllFromDB,
};

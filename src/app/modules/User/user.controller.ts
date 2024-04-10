import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfuly",
    data: result,
  });
});

export const userController = {
  createUser,
};

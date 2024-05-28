import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import prisma from "../../../shared/prisma";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      token: result.accessToken,
    },
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { ...passwordData } = req.body;

  await AuthServices.changePassword(user, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successfully!",
    data: {
      status: 200,
      message: "Password changed successfully!",
    },
  });
});

export const AuthController = {
  loginUser,
  changePassword,
};

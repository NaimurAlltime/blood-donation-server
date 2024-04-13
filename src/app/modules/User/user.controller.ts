import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import pick from "../../../helpars/pick";
import { userFilterableFields } from "./user.constant";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfuly",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await userService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donors successfully found",
    meta: result.meta,
    data: result.data,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = (req as any).user;
  const result = await userService.getMyProfileFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = (req as any).user;

  const result = await userService.updateProfileIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  getAllFromDB,
  getMyProfile,
  updateMyProfile,
};

import { jwtHelpers } from "../../../helpars/jwtHelpers";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import config from "../../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import { UserStatus } from "@prisma/client";
import { IChangePassword } from "./auth.interface";
import { AuthUtils } from "./auth.utils";
import { hashedPassword } from "../../../helpars/hashPasswordHelper";
import AppError from "../../errors/AppError";

const loginUser = async (payload: {
  usernameOrEmail: string;
  password: string;
}) => {
  // Find user by email or username
  const userData = await prisma.user.findFirst({
    where: {
      OR: [
        { email: payload.usernameOrEmail },
        { username: payload.usernameOrEmail },
      ],
    },
  });

  // If no user is found, throw an error
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  // console.log(userData);

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.NOT_FOUND, "Password incorrect!");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: UserStatus.ACTIVE,
    },
  });

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await AuthUtils.comparePasswords(oldPassword, isUserExist.password))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old Password is incorrect");
  }

  const hashPassword = await hashedPassword(newPassword);

  await prisma.user.update({
    where: {
      id: isUserExist.id,
    },
    data: {
      password: hashPassword,
    },
  });
};

export const AuthServices = {
  loginUser,
  changePassword,
};

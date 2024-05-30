import * as bcrypt from "bcrypt";
import { Prisma, User } from "@prisma/client";
import { userSearchAbleFields } from "./user.constant";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (data: any) => {
  // Check if the username or email already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: data.username }, { email: data.email }],
    },
    select: {
      username: true,
      email: true,
    },
  });

  if (existingUser) {
    if (existingUser.username === data.username) {
      throw new Error("Username already taken, please choose a different one.");
    } else if (existingUser.email === data.email) {
      throw new Error(
        "Email already registered, please use a different email."
      );
    }
  }

  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    name: data.name,
    username: data.username,
    email: data.email,
    password: hashedPassword,
    bloodType: data.bloodType,
    location: data.location,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const user = await transactionClient.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        bloodType: true,
        location: true,
        availability: true,
        createdAt: true,
        updatedAt: true,
        userProfile: true,
      },
    });

    const userProfileData = {
      userId: user.id,
      age: data.age,
      lastDonationDate: data.lastDonationDate,
      profilePhoto: data.profilePhoto,
    };

    const createdUserProfile = await transactionClient.userProfile.create({
      data: userProfileData,
    });

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      bloodType: user.bloodType,
      location: user.location,
      availability: user.availability,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      userProfile: createdUserProfile,
    };
  });

  return result;
};

export default createUser;

const getAllFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondtions: Prisma.UserWhereInput[] = [];
  if (params.searchTerm) {
    andCondtions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondtions.push({
      AND: Object.keys(filterData).map((key) => {
        let searchField;
        if ((filterData as any)[key] === "true") {
          searchField = true;
        } else if ((filterData as any)[key] === "false") {
          searchField = false;
        } else {
          searchField = (filterData as any)[key];
        }

        return {
          [key]: {
            equals: searchField,
          },
        };
      }),
    });
  }

  const whereConditons: Prisma.UserWhereInput =
    andCondtions.length > 0 ? { AND: andCondtions } : {};

  const orderBy: any = {};

  if (options.sortBy === "name") {
    orderBy.name = options.sortOrder || "asc";
  } else if (options.sortBy === "age") {
    orderBy.userProfile = { age: options.sortOrder || "asc" };
  } else if (options.sortBy === "lastDonationDate") {
    orderBy.userProfile = { lastDonationDate: options.sortOrder || "asc" };
  } else {
    orderBy.createdAt = options.sortOrder || "asc";
  }

  const result = await prisma.user.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy,
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      bloodType: true,
      location: true,
      availability: true,
      createdAt: true,
      updatedAt: true,
      userProfile: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditons,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getMyProfileFromDB = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      bloodType: true,
      location: true,
      availability: true,
      createdAt: true,
      updatedAt: true,
      userProfile: true,
    },
  });

  return result;
};

const updateProfileIntoDB = async (id: string, updateData: any) => {
  // Find the user and throw an error if not found
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  // Update the user and userProfile data
  const updatedProfile = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name: updateData.name,
      username: updateData.username,
      email: updateData.email,
      role: updateData.role,
      bloodType: updateData.bloodType,
      location: updateData.location,
      availability: updateData.availability,
      userProfile: {
        update: {
          age: updateData?.userProfile?.age,
          lastDonationDate: updateData?.userProfile?.lastDonationDate,
          profilePhoto: updateData?.userProfile?.profilePhoto,
        },
      },
    },
    include: {
      userProfile: true,
    },
  });

  return updatedProfile;
};

export const userService = {
  createUser,
  getAllFromDB,
  getMyProfileFromDB,
  updateProfileIntoDB,
};

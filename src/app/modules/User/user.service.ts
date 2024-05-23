import * as bcrypt from "bcrypt";
import { Prisma, User } from "@prisma/client";
import { userSearchAbleFields } from "./user.constant";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateUserData {
  username: string;
  email: string;
  password: string;
  role: string;
  bloodType: string;
  location: string;
  bio: string;
  age: number;
  lastDonationDate: Date;
}

const createUser = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    username: data.username,
    email: data.email,
    password: hashedPassword,
    role: data.role,
    bloodType: data.bloodType,
    location: data.location,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const user = await transactionClient.user.create({
      data: userData,
      select: {
        id: true,
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
      bio: data.bio,
      age: data.age,
      lastDonationDate: data.lastDonationDate,
    };

    const createdUserProfile = await transactionClient.userProfile.create({
      data: userProfileData,
    });

    return {
      id: user.id,
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
      username: true,
      email: true,
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
      username: true,
      email: true,
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

const updateProfileIntoDB = async (id: string, updateData: User) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updadataProfile = await prisma.user.update({
    where: {
      id,
    },
    data: {
      userProfile: {
        update: updateData,
      },
    },
    include: {
      userProfile: true,
    },
  });

  return updadataProfile.userProfile;
};

export const userService = {
  createUser,
  getAllFromDB,
  getMyProfileFromDB,
  updateProfileIntoDB,
};

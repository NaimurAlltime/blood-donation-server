import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";

const createUser = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    name: data.name,
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
        email: true,
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
      name: user.name,
      email: user.email,
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

export const userService = {
  createUser,
};

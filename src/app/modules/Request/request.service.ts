import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import AppError from "../../errors/AppError";
import { TRequestStatus } from "@prisma/client";

const createRequesDonation = async (id: string, data: any) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const requestData = {
    ...data,
    requesterId: id,
  };

  // Create blood donation request
  const donationRequest = await prisma.request.create({
    data: requestData,
    select: {
      id: true,
      donorId: true,
      phoneNumber: true,
      dateOfDonation: true,
      hospitalName: true,
      hospitalAddress: true,
      reason: true,
      requestStatus: true,
      termsAndCondition: true,
      createdAt: true,
      updatedAt: true,
      donor: {
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
      },
    },
  });

  return donationRequest;
};

const getAlDonationRequest = async (id: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const donationRequests = await prisma.request.findMany({
    where: {
      donorId: id,
    },
    include: {
      requester: {
        select: {
          id: true,
          name: true,
          email: true,
          location: true,
          bloodType: true,
          availability: true,
        },
      },
    },
  });

  return donationRequests;
};

const getMyRequests = async (id: string) => {
  const donor = await prisma.user.findUnique({
    where: { id },
    include: {
      requester: {
        include: {
          donor: true,
        },
      },
    },
  });

  return donor?.requester;
};

const updateRequestStatus = async (
  id: string,
  payload: { status: TRequestStatus }
) => {
  // Find the user and throw an error if not found
  await prisma.request.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.request.update({
    where: {
      id,
    },
    data: {
      requestStatus: TRequestStatus.APPROVED,
    },
  });

  return result;
};

const acceptDonationRequest = async (requestId: string, userId: string) => {
  // Fetch the request from the database
  const request = await prisma.request.findUnique({
    where: { id: requestId },
  });

  // Check if the request exists
  if (!request) {
    throw new AppError(httpStatus.BAD_REQUEST, "Request not found");
  }

  // Fetch the user from the database
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // Check if the user exists
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }

  // // Ensure that the user is not accepting their own request
  // if (request.requesterId === user.id) {
  //   throw new AppError(
  //     httpStatus.FORBIDDEN,
  //     "You cannot accept your own request"
  //   );
  // }

  // Update the request to set the donor and change the status to approved
  return await prisma.request.update({
    where: { id: request.id },
    data: {
      donorId: user.id,
      requestStatus: TRequestStatus.APPROVED,
    },
  });
};

export const RequestService = {
  createRequesDonation,
  getAlDonationRequest,
  updateRequestStatus,
  acceptDonationRequest,
  getMyRequests,
};

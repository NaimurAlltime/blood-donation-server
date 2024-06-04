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
  const donor = await prisma.user.findUnique({
    where: { id },
    include: {
      donor: {
        where: { requestStatus: { not: { equals: TRequestStatus.APPROVED } } },
        include: {
          requester: true,
        },
      },
    },
  });
  return donor?.donor;
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

export const RequestService = {
  createRequesDonation,
  getAlDonationRequest,
  updateRequestStatus,
  getMyRequests,
};

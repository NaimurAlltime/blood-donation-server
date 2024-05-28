import prisma from "../../../shared/prisma";

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

const updateRequestStatus = async (requestId: string, requestStatus: any) => {
  await prisma.request.findUniqueOrThrow({
    where: {
      id: requestId,
    },
  });

  const result = await prisma.request.update({
    where: {
      id: requestId,
    },
    data: requestStatus,
  });

  return result;
};

export const RequestService = {
  createRequesDonation,
  getAlDonationRequest,
  updateRequestStatus,
};

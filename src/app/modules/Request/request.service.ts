import prisma from "../../../shared/prisma";

const createRequesDonation = async (data: any) => {
  const requestData = {
    donorId: data.donorId,
    phoneNumber: data.phoneNumber,
    dateOfDonation: data.dateOfDonation,
    hospitalName: data.hospitalName,
    hospitalAddress: data.hospitalAddress,
    reason: data.reason,
  };

  // Create blood donation request
  const donationRequest = await prisma.request.create({
    data: requestData,
    include: {
      donor: {
        include: {
          userProfile: true,
        },
      },
    },
  });

  // Prepare response
  const responseData = {
    id: donationRequest.id,
    donorId: donationRequest.donorId,
    phoneNumber: donationRequest.phoneNumber,
    dateOfDonation: donationRequest.dateOfDonation,
    hospitalName: donationRequest.hospitalName,
    hospitalAddress: donationRequest.hospitalAddress,
    reason: donationRequest.reason,
    requestStatus: donationRequest.requestStatus,
    createdAt: donationRequest.createdAt.toISOString(),
    updatedAt: donationRequest.updatedAt.toISOString(),
    donor: {
      id: donationRequest.donor?.id,
      name: donationRequest.donor?.name,
      email: donationRequest.donor?.email,
      bloodType: donationRequest.donor?.bloodType,
      location: donationRequest.donor?.location,
      availability: donationRequest.donor?.availability,
      createdAt: donationRequest.donor?.createdAt,
      updatedAt: donationRequest.donor?.updatedAt,
      userProfile: {
        id: donationRequest.donor?.userProfile?.id,
        userId: donationRequest.donor?.userProfile?.userId,
        bio: donationRequest.donor?.userProfile?.bio,
        age: donationRequest.donor?.userProfile?.age,
        lastDonationDate: donationRequest.donor?.userProfile?.lastDonationDate,
        createdAt: donationRequest.donor?.userProfile?.createdAt,
        updatedAt: donationRequest.donor?.userProfile?.updatedAt,
      },
    },
  };

  return responseData;
};

export const RequestService = {
  createRequesDonation,
};

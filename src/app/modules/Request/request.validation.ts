import { TRequestStatus } from "@prisma/client";
import { z } from "zod";

const createRequestValidationSchema = z.object({
  body: z.object({
    donorId: z.string({
      invalid_type_error: "donorId must be string",
      required_error: "donorId is required",
    }),
    requesterId: z.string({
      invalid_type_error: "requesterId must be string",
      required_error: "requesterId is required",
    }),
    phoneNumber: z.string({
      invalid_type_error: "phoneNumber must be string",
      required_error: "phoneNumber is required",
    }),
    dateOfDonation: z.string({
      invalid_type_error: "dateOfDonation must be string",
      required_error: "dateOfDonation is required",
    }),
    hospitalName: z.string({
      invalid_type_error: "hospitalName must be string",
      required_error: "hospitalName is required",
    }),
    hospitalAddress: z.string({
      invalid_type_error: "hospitalAddress must be string",
      required_error: "hospitalAddress is required",
    }),
    reason: z.string({
      invalid_type_error: "reason must be string",
      required_error: "reason is required",
    }),
  }),
});

const updateStatus = z.object({
  body: z.object({
    requestStatus: z.enum([
      TRequestStatus.APPROVED,
      TRequestStatus.PENDING,
      TRequestStatus.REJECTED,
    ]),
  }),
});

export const requestValidation = {
  createRequestValidationSchema,
  updateStatus,
};

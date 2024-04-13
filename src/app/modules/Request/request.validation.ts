import { TRequestStatus } from "@prisma/client";
import { z } from "zod";

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
  updateStatus,
};

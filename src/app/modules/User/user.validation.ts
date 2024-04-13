import { BloodGroup } from "@prisma/client";
import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "name must be string",
      required_error: "name is required",
    }),
    email: z
      .string({
        invalid_type_error: "email must be string",
        required_error: "email is required",
      })
      .email({
        message: "Invalid email format",
      }),
    password: z
      .string({
        invalid_type_error: "password must be string",
        required_error: "password is required",
      })
      .min(6, {
        message: "Password must be at least 6 characters long",
      }),
    bloodType: z.enum([
      BloodGroup.AB_NEGATIVE,
      BloodGroup.AB_POSITIVE,
      BloodGroup.A_NEGATIVE,
      BloodGroup.A_POSITIVE,
      BloodGroup.B_NEGATIVE,
      BloodGroup.B_POSITIVE,
      BloodGroup.O_NEGATIVE,
      BloodGroup.O_POSITIVE,
    ]),
    location: z.string({
      invalid_type_error: "location must be string",
      required_error: "location is required",
    }),
    availability: z.boolean().optional(),
    age: z.number({
      invalid_type_error: "age must be number",
      required_error: "age is required",
    }),
    bio: z.string({
      invalid_type_error: "bio must be string",
      required_error: "bio is required",
    }),
    lastDonationDate: z.string({
      invalid_type_error: "lastDonationDate must be string",
      required_error: "lastDonationDate is required",
    }),
  }),
});

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "name must be string",
        required_error: "name is required",
      })
      .optional(),
    bloodType: z
      .enum([
        BloodGroup.AB_NEGATIVE,
        BloodGroup.AB_POSITIVE,
        BloodGroup.A_NEGATIVE,
        BloodGroup.A_POSITIVE,
        BloodGroup.B_NEGATIVE,
        BloodGroup.B_POSITIVE,
        BloodGroup.O_NEGATIVE,
        BloodGroup.O_POSITIVE,
      ])
      .optional(),
    location: z
      .string({
        invalid_type_error: "location must be string",
        required_error: "location is required",
      })
      .optional(),
    availability: z.boolean().optional(),
    age: z
      .number({
        invalid_type_error: "age must be number",
        required_error: "age is required",
      })
      .optional(),
    bio: z
      .string({
        invalid_type_error: "bio must be string",
        required_error: "bio is required",
      })
      .optional(),
    lastDonationDate: z
      .string({
        invalid_type_error: "lastDonationDate must be string",
        required_error: "lastDonationDate is required",
      })
      .optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateProfileValidationSchema,
};

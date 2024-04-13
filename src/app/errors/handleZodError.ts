import { ZodError, ZodIssue } from "zod";
import { TGenericErrorResponse } from "../interfaces/error";

const zodErrorHandler = (err: ZodError): TGenericErrorResponse => {
  const errorMessage = err?.issues?.map(
    (issue: ZodIssue) => `${issue?.path[issue?.path?.length - 1]} is required`
  );

  const formattedErrorMessage = errorMessage?.join(". ") || "";

  const errorDetails = err.issues.map((issue: ZodIssue) => ({
    field: issue.path[issue.path.length - 1],
    message: issue.message,
  }));

  return {
    statusCode: 400,
    message: formattedErrorMessage,
    errorDetails: {
      issues: errorDetails,
    },
  };
};

export default zodErrorHandler;

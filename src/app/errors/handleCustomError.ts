import AppError from "./AppError";

const handleCustomError = (err: AppError) => {
  let errorResponse: Record<string, unknown> | null | string = {};

  if (err.type === "WrongCredentials") {
    errorResponse = {
      email: {
        path: "email",
        message: "Wrong Credentials",
      },
      password: {
        path: "password",
        message: "Wrong Credentials",
      },
    };
  }

  if (err.type === "Unauthorize") {
    errorResponse = "Your ane not authorized";
  }

  if (err.type === "NOT_FOUND") {
    errorResponse = {};
  }

  return errorResponse;
};

export default handleCustomError;

import express, { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import zodErrorHandler from "../errors/handleZodError";
import handleCustomError from "../errors/handleCustomError";
import AppError from "../errors/AppError";

// Custom error interfaces
interface ValidationErrorDetails {
  field: string;
  message: string;
}

interface ValidationError extends Error {
  issues: ValidationErrorDetails[];
}

// Custom error classes
class UnauthorizedError extends Error {}

// Global error handling middleware
const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorDetails: any = err.message;

  if (err instanceof UnauthorizedError) {
    statusCode = 401;
    message = "Unauthorized";
  } else if (err instanceof ZodError) {
    const simplifiedError = zodErrorHandler(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorDetails;
  } else if (err instanceof AppError) {
    const errors = handleCustomError(err);

    statusCode = err.statusCode;
    message = err.message;
    errorDetails = errors;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;

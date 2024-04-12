import express, { Request, Response, NextFunction } from "express";

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
  } else if ((err as ValidationError).issues) {
    const validationError = err as ValidationError;
    statusCode = 400;
    message = "Validation Error";
    errorDetails = { issues: validationError.issues };
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;

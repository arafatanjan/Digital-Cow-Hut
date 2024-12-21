import { ErrorRequestHandler } from 'express';
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from '../interface/error';
import { TErrorSources } from '../interface/error';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handlecasterror';
import handleDuplicateError from '../errors/handleDuplicateError';


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Log the error (optional, for debugging purposes)
  console.log(err.statusCode);

  // Default error values
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  // Handle different types of errors
  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode ?? 400;  // Default to 400 if no statusCode provided
    message = simplifiedError?.message ?? 'Validation failed';
    errorSources = simplifiedError?.errorSources ?? [];
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode ?? 400;  // Default to 400 if no statusCode provided
    message = simplifiedError?.message ?? 'Invalid ObjectId format';
    errorSources = simplifiedError?.errorSources ?? [];
  } else if (err?.code === 11000) {  // Duplicate key error in MongoDB
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode ?? 400;
    message = simplifiedError?.message ?? 'Duplicate key error';
    errorSources = simplifiedError?.errorSources ?? [];
  }

  // Return the error response
   res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    // stack: config.NODE_ENV === 'development' ? err?.stack : undefined,  
  });
};

export default globalErrorHandler;


// export const errorHandler = (
//     err: any,
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Response => {
//     const statusCode = err.statusCode || 500;
//     const response: ErrorResponse = {
//       success: false,
//       message: err.message || "Internal Server Error",
//       errorMessages: err.errors ? err.errors.map((e: any) => ({ path: e.path, message: e.message })) : [],
//       stack: process.env.NODE_ENV === "production" ? "" : err.stack,
//     };
  
//     return res.status(statusCode).json(response);
//   };
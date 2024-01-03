/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleCastError from '../errors/handleCastError';
import handleValidationError from '../errors/handleValidationError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something Went Wrong';

  let errorMessage = [{ message: 'Something Went Wrong' }];

  if (err.name === 'ValidationError') {
    const modifiedError = handleValidationError(err);
    statusCode = modifiedError?.statusCode;
    message = modifiedError?.message;
    errorMessage = modifiedError?.errorMessage;
  } else if (err.name === 'CastError') {
    const modifiedError = handleCastError(err);
    statusCode = modifiedError?.statusCode;
    message = modifiedError?.message;
    errorMessage = modifiedError?.errorMessage;
  } else if (err.code === 11000) {
    const modifiedError = handleDuplicateError(err);
    message = modifiedError?.message;
    errorMessage = [modifiedError?.errorMessage];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessage = [{ message: err?.message }];
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorMessage,
    errorDetails: err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

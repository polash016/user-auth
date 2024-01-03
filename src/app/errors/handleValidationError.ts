import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorMessage = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        message: val?.message,
      };
    },
  );

  const statusCode = 400;

  return {
    success: false,
    statusCode,
    message: 'Validation Error',
    errorMessage,
    errorDetails: err,
  };
};

export default handleValidationError;

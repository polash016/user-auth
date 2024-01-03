import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorObj = [{ message: err.message }];
  return {
    success: false,
    statusCode: 400,
    message: `${err.value} is not valid`,
    errorMessage: errorObj,
    errorDetails: err,
  };
};

export default handleCastError;

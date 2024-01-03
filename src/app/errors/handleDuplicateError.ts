/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (err: any) => {
  const match = err.message.match(/"([^"]*)"/);
  const message = match && match[1];
  const errorObj = {
    message,
  };

  return {
    statusCode: 400,
    message: 'Duplicate Error',
    errorMessage: errorObj,
  };
};

export default handleDuplicateError;

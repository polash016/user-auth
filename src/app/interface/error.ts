/* eslint-disable @typescript-eslint/no-explicit-any */
export type TGenericErrorResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  errorMessage: { message: string }[];
  errorDetails: any;
};

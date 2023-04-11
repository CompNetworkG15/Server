import { HttpException, HttpStatus } from '@nestjs/common';

export const throwErrorException = (error: Error & { statusCode: number }) => {
  const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  throw new HttpException(
    {
      status: statusCode,
      error: error.message,
    },
    statusCode,
    {
      cause: error,
    },
  );
};

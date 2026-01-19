import { HttpException, HttpStatus } from '@nestjs/common';

type RpcPayload = {
  statusCode?: number;
  message?: string;
  error?: string;
};

export function mapRpcToHttp(err: unknown): never {
  const payload = (err as { message?: RpcPayload })?.message;

  const statusCode =
    typeof payload?.statusCode === 'number'
      ? payload.statusCode
      : HttpStatus.INTERNAL_SERVER_ERROR;

  throw new HttpException(
    {
      statusCode,
      message: payload?.message ?? 'Unexpected microservice error',
      error: payload?.error ?? 'InternalServerError',
    },
    statusCode,
  );
}

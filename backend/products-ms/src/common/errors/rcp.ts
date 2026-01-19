import { RpcException } from '@nestjs/microservices';

export const rpc = {
  notFound: (message: string) =>
    new RpcException({ statusCode: 404, error: 'NotFound', message }),

  badRequest: (message: string) =>
    new RpcException({ statusCode: 400, error: 'BadRequest', message }),

  internal: (message = 'Internal server error') =>
    new RpcException({
      statusCode: 500,
      error: 'InternalServerError',
      message,
    }),
};

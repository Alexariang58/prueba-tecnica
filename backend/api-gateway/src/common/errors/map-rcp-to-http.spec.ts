import { HttpException, HttpStatus } from '@nestjs/common';
import { mapRpcToHttp } from './map-rcp-to-http';

describe('mapRpcToHttp', () => {
  it('should throw HttpException with correct status from RPC error', () => {
    const rpcError = {
      message: {
        statusCode: 404,
        message: 'Product not found',
        error: 'NotFound',
      },
    };

    expect(() => mapRpcToHttp(rpcError)).toThrow(HttpException);

    try {
      mapRpcToHttp(rpcError);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect((error as HttpException).getStatus()).toBe(404);
      expect((error as HttpException).getResponse()).toEqual({
        statusCode: 404,
        message: 'Product not found',
        error: 'NotFound',
      });
    }
  });

  it('should throw HttpException with 400 for BadRequest', () => {
    const rpcError = {
      message: {
        statusCode: 400,
        message: 'Invalid data',
        error: 'BadRequest',
      },
    };

    try {
      mapRpcToHttp(rpcError);
    } catch (error) {
      expect((error as HttpException).getStatus()).toBe(400);
      expect((error as HttpException).getResponse()).toEqual({
        statusCode: 400,
        message: 'Invalid data',
        error: 'BadRequest',
      });
    }
  });

  it('should default to 500 when statusCode is missing', () => {
    const rpcError = {
      message: {
        message: 'Something went wrong',
      },
    };

    try {
      mapRpcToHttp(rpcError);
    } catch (error) {
      expect((error as HttpException).getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });

  it('should use default message when message is missing', () => {
    const rpcError = {};

    try {
      mapRpcToHttp(rpcError);
    } catch (error) {
      expect((error as HttpException).getResponse()).toEqual({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unexpected microservice error',
        error: 'InternalServerError',
      });
    }
  });
});

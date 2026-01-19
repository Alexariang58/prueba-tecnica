export const env = {
  GATEWAY_PORT: Number(process.env.GATEWAY_PORT ?? 3000),

  PRODUCTS_MS_HOST: process.env.PRODUCTS_MS_HOST ?? '127.0.0.1',
  PRODUCTS_MS_PORT: Number(process.env.PRODUCTS_MS_PORT ?? 4000),
} as const;

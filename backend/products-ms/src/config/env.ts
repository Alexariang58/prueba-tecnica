export const env = {
  //Data Base
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  // Microservice Config
  MS_HOST: process.env.MS_HOST,
  MS_PORT: Number(process.env.MS_PORT),
} as const;

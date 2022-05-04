import 'dotenv/config';

export const appConfig = {
  jwtSecret: process.env.JWT_SECRET || 'jwt-secret',
  port: process.env.JWT_SECRET || 3000,
};

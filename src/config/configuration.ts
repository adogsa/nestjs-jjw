import { registerAs } from '@nestjs/config';

export default registerAs('global', () => ({
  env: process.env.ENV ?? 'dev',
  db: {
    rdb: {
      host: process.env.RDB_HOST,
      port: parseInt(process.env.RDB1_PORT ?? '3306', 10),
      username: process.env.RDB_USERNAME,
      password: process.env.RDB_PASSWORD,
      database: process.env.RDB_DBNAME,
    },
  },
  auth: {
    accessTokenSecret: process.env.AUTH_ACCESS_TOKEN_SECRET ?? '',
    refreshTokenSecret: process.env.AUTH_REFRESH_TOKEN_SECRET ?? '',
    accessTokenExpirationTime: process.env.AUTH_ACCESS_TOKEN_EXP_TIME ?? '1d',
    refreshTokenExpirationTime: process.env.AUTH_REFRESH_TOKEN_EXP_TIME ?? '2d',
  },
}));

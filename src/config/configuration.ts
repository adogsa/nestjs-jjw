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
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      entityPrefix: process.env.DB_ENTITY_PREFIX ?? '',
      useEntityRandomPrefix:
        process.env.DB_USE_TABLE_RANDOM_PREFIX === 'true' || false,
      logging: process.env.DB_TYPEORM_LOGGING === 'true' || false,
    },
  },
}));

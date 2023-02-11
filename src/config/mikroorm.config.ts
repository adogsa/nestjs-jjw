import configuration from './configuration';
import type { ConfigType } from '@nestjs/config';
import { MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';

export const DB1_NANE = 'DB1';
export const mikroOrmAsyncDB1Options: MikroOrmModuleAsyncOptions = {
  inject: [configuration.KEY],
  contextName: DB1_NANE,
  useFactory: (config: ConfigType<typeof configuration>) => {
    return {
      name: DB1_NANE,
      type: 'mysql',
      host: config.db.rdb.host,
      port: config.db.rdb.port,
      user: config.db.rdb.username,
      password: config.db.rdb.password,
      dbName: config.db.rdb.database,
      synchronize: config.db.rdb.synchronize,
      logging: config.db.rdb.logging,
      registerRequestContext: false,
      allowGlobalContext: true,
      entities: [AppReview, CertInfo, CertPay, CertPayTmp],
      debug: true,
      extra: { max: 128 },
    };
  },
};

import configuration from './configuration';
import type { ConfigType } from '@nestjs/config';
import { MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';
import { User } from '../user/repository/user.entity';

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
      registerRequestContext: false,
      allowGlobalContext: true,
      entities: [User],
      debug: true,
      extra: { max: 128 },
    };
  },
};

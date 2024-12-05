import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const getOrmConfig = (): TypeOrmModuleOptions => {
  const config: TypeOrmModuleOptions = {
    type: 'postgres',
    database: 'open-ai',
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    host: 'localhost',
    synchronize: true,
    autoLoadEntities: true,
    logger: 'advanced-console',
    cache: true,
  };
  return config;
};
export { getOrmConfig };

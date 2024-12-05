import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverAsyncConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as TypeORM from 'typeorm';
import { getOrmConfig } from './orm.config.js';
import { Conversation } from './conversation-entity.js';

const gqlConfig: ApolloDriverAsyncConfig = {
  driver: ApolloDriver,
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    TypeOrmModule.forRootAsync({
      useFactory: getOrmConfig,
    }),
  ],
  useFactory: async () => ({
    path: '/graphql',
    autoSchemaFile: true,
    sortSchema: true,
    playground: false,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  }),
  inject: [TypeORM.DataSource],
};

export { gqlConfig };

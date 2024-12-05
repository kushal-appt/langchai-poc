import { Module } from '@nestjs/common';
import { ApolloDriverAsyncConfig } from '@nestjs/apollo';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { GraphQLModule } from '@nestjs/graphql';
import { gqlConfig } from './gql.config.js';
import { ConversationModule } from './conversation.module.js';
import { ConfigModule } from '@nestjs/config';
import { loadConfiguration } from './app-config.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadConfiguration],
      isGlobal: true,
    }),
    ConversationModule,
    GraphQLModule.forRootAsync<ApolloDriverAsyncConfig>(gqlConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

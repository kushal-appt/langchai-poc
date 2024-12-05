import { Module } from '@nestjs/common';
import { getOrmConfig } from './orm.config.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './conversation-entity.js';
import { ConversationService } from './conversation.service.js';
import { ConversationResolver } from './conversation-resolver.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    TypeOrmModule.forRootAsync({
      useFactory: getOrmConfig,
    }),
  ],

  providers: [ConversationService, ConversationResolver],
})
export class ConversationModule {}

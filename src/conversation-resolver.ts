import * as NestJSGraphQL from '@nestjs/graphql';
import { ConversationService } from './conversation.service.js';
import { ConversationInput } from './conversation-input.js';
import { Conversation } from './conversation-entity.js';

@NestJSGraphQL.Resolver()
class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @NestJSGraphQL.Query(() => [Conversation])
  async conversations(): Promise<Conversation[] | []> {
    return await this.conversationService.conversations();
  }


  @NestJSGraphQL.Mutation(() => Conversation)
  async createConversation(
    @NestJSGraphQL.Args('data') data: ConversationInput,
  ): Promise<Conversation> {
    return await this.conversationService.createConversation(data);
  }
}

export { ConversationResolver };

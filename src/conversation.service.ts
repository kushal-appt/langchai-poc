import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as TypeORM from 'typeorm';
import { Conversation } from './conversation-entity.js';
import { ConversationInput } from './conversation-input.js';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConversationService {
  constructor(
    private configService: ConfigService,
    private dataSource: TypeORM.DataSource,
    @InjectRepository(Conversation)
    private readonly conversationRepository: TypeORM.Repository<Conversation>,
  ) {
    this.conversationRepository = this.dataSource.getRepository(Conversation);
  }

  async conversations(): Promise<Conversation[] | []> {
    try {
      const conversations: Conversation[] | [] =
        await this.conversationRepository.find();
      return conversations;
    } catch (error: any) {
      throw new Error(`Failed to load conversations`);
    }
  }

  async createConversation(data: ConversationInput): Promise<Conversation> {
    try {
      const isSchemaQuery: boolean = [
        'schema',
        'json',
        'tables',
        'table',
        'columns',
        'column',
        'entities',
        'entity',
      ].some((word: string) => data?.message?.toLowerCase()?.includes(word));

      const formatInstructions: string = `Respond only in valid JSON. The JSON object you return should match the following schema:
      {
        tables: {
          name: "string",
          description:"string", //provide relevant description for table
          columns: [
            {
              name: "string",
              isPrimary: "boolean",
              isNullable: "boolean",
              dataType: "string"  // Should be one of the following values:
              // smallint, integer, bigint, double precision, decimal, numeric, real, char,
              // varchar, text, money, bytea, date, time, time with time zone, timestamp,
              // timestamp with time zone, boolean, point, uuid, inet, macaddr, cidr,
              // json, jsonb, enum, array
            }
          ]
        }[]
      }`;

      const messageToSend = isSchemaQuery
        ? `${formatInstructions}\n\n${data.message}`
        : data.message;

      console.log(messageToSend);

      let aiResponse;
      const reqObj = {
        model: 'llama3',
        messages: [{ role: 'user', content: messageToSend }],
        stream: false,
      };

      try {
        const aiRequest: any = await axios.post(
          this.configService.get<string>('aiUrl', ''),
          reqObj,
          {
            auth: {
              username: this.configService.get<string>('aiUsername', ''),
              password: this.configService.get<string>('aiPassword', ''),
            },
          },
        );

        // console.log(aiRequest);
        aiResponse = aiRequest.data.message.content;
      } catch (error: any) {
        console.log(error?.message);
        throw new Error('Failed to get a response from the AI service');
      }

      const conversationToCreate: Conversation =
        this.conversationRepository.create(data);
      conversationToCreate.response = aiResponse;

      const savedConversation =
        await this.conversationRepository.save(conversationToCreate);

      if (savedConversation) {
        return savedConversation;
      }

      throw new Error(`There was an issue in processing your request`);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

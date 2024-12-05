
  import * as NestJSGraphQL from '@nestjs/graphql';
  import { IsEnum, IsString } from 'class-validator';
  
  @NestJSGraphQL.InputType()
  export class ConversationInput {
    @NestJSGraphQL.Field(() => String, { nullable: false })
    @IsString()
    message!: string;
  }
  
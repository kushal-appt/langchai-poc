import * as NestJSGraphQL from '@nestjs/graphql';
import * as TypeORM from 'typeorm';

@TypeORM.Entity()
@NestJSGraphQL.ObjectType()
export class Conversation {
  @NestJSGraphQL.Field(() => String, { nullable: true })
  @TypeORM.PrimaryGeneratedColumn('uuid')
  id!: string;

  @NestJSGraphQL.Field(() => String, { nullable: false })
  @TypeORM.Column({ type: 'text', nullable: false })
  message!: string;

  @NestJSGraphQL.Field(() => String, { nullable: true })
  @TypeORM.Column({ type: 'text', nullable: true })
  response?: string;
}

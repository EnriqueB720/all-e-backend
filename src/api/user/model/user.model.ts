import { Field, ObjectType } from '@nestjs/graphql';
import { Watch } from 'src/api/watch/model';

@ObjectType()
export class User {
  @Field(() => Number)
  id?: number;

  @Field()
  walletAddress?: string;

  @Field()
  email?: string;

  @Field()
  username?: string;

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Watch, {nullable: true})
  watch?: Watch;
}
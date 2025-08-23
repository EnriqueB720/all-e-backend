import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Language } from '@prisma/client';
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

  @Field(() => Language)
  language?: Language;

  @Field(() => [Watch], {nullable: true})
  watch?: Watch[];
}

registerEnumType(Language,{
  name: 'Language'
})
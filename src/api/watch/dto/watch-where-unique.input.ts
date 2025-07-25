import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class WatchWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  uuid?: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => Int, { nullable: true })
  phoneNumber: number;

  @Field(() => String, { nullable: true })
  email?: string;
}
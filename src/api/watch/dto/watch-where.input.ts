import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WatchWhereInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  ownerId?: number;

  @Field(() => String, { nullable: true })
  serialNum?: string;

  @Field(() => String, { nullable: true })
  username?: string;
}

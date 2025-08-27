import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WatchWhereInput {
  @Field(() => Int)
  id?: number;

  @Field(() => Int)
  ownerId?: number;

  @Field(() => Int, { nullable: true })
  serialNum?: number;
}
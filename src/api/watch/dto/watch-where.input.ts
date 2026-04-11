import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WatchWhereInput {
  @Field(() => Int)
  id?: number;

  @Field(() => Int)
  ownerId?: number;

  @Field(() => String, { nullable: true })
  serialNum?: string;
}

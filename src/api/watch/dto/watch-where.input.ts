import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class WatchWhereInput {
  @Field(() => Number)
  id?: number;

  @Field(() => Number)
  ownerId?: number;

  @Field(() => Number, { nullable: true })
  serialNum?: number;
}
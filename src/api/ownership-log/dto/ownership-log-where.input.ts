import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class OwnershipLogWhereInput {
  @Field(() => Int)
  ownerId?: number;

  @Field(() => Int)
  watchId?: number;
}
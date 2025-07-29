import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OwnershipLogCreateInput {
  @Field(() => Number)
  ownerId?: number;

  @Field(() => Number)
  watchId?: number;

  @Field(() => Date)
  timestamp?: Date;
}
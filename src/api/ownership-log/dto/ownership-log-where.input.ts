import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OwnershipLogWhereInput {
  @Field(() => Number)
  ownerId?: number;

  @Field(() => Number)
  watchId?: number;
}
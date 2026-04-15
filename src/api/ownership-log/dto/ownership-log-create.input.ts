import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class OwnershipLogCreateInput {
  @Field(() => Int)
  ownerId: number;

  @Field(() => Int)
  watchId: number;

  @Field(() => String, { nullable: true })
  metadataURI?: string | null;
}
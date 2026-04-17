import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RespondTransferRequestInput {
  @Field(() => Int)
  transferRequestId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Boolean)
  accept: boolean;
}

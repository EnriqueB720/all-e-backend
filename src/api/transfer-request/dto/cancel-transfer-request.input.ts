import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CancelTransferRequestInput {
  @Field(() => Int)
  transferRequestId: number;

  @Field(() => Int)
  userId: number;
}

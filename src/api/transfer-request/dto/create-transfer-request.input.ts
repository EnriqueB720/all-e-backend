import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTransferRequestInput {
  @Field(() => Int)
  watchId: number;

  @Field(() => Int)
  fromUserId: number;

  @Field(() => String)
  toUserEmail: string;
}

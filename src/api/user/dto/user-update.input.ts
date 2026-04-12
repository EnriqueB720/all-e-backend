import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UserUpdateInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  walletAddress?: string;
}

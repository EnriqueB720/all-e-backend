import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UserWhereInput {
  @Field(() => Number, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  email?: string;
}
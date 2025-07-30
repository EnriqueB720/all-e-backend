import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UserWhereInput {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;
}
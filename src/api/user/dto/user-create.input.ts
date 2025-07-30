import { Field, InputType, Int } from '@nestjs/graphql';

import { IsEmail, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UserCreateInput {
  @Field()
  walletAddress: string;

  @IsEmail()
  @MaxLength(100)
  @Field()
  email: string;

  @MinLength(4)
  @MaxLength(100)
  @Field()
  username: string;

  @MinLength(8)
  @Field()
  password: string;
}
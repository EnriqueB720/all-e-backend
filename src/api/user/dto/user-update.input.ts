import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength, MinLength, IsOptional } from 'class-validator';

@InputType()
export class UserUpdateInput {
  @Field(() => Int)
  id: number;

  @IsOptional()
  @MinLength(4)
  @MaxLength(100)
  @Field(() => String, { nullable: true })
  username?: string;

  @IsOptional()
  @MinLength(8)
  @Field(() => String, { nullable: true })
  currentPassword?: string;

  @IsOptional()
  @MinLength(8)
  @Field(() => String, { nullable: true })
  newPassword?: string;
}

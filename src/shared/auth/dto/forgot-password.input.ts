import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ForgotPasswordInput {
  @Field() email: string;
}

@InputType()
export class ResetPasswordInput {
  @Field() token: string;
  @Field() newPassword: string;
}

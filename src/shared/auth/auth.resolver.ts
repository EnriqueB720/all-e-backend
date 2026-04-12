import { UseGuards } from '@nestjs/common';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ForgotPasswordInput, ResetPasswordInput, SignUpInput } from './dto';

import { GqlAuthGuard } from './guards';

import { AuthService } from './auth.service';

import { LoginUserInput, LoginOutput } from './dto';

import { GraphQLFields, IGraphQLFields } from '../decorators';

import { User, UserSelect } from 'src/api/user/model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => LoginOutput)
  login(@Args('data') data: LoginUserInput) {
    return this.authService.login(data);
  }

  @Mutation(() => User)
  signup(
    @Args('data') data: SignUpInput,
    @GraphQLFields() { fields }: IGraphQLFields<UserSelect>,
  ) {
    return this.authService.signup(data, fields);
  }

  @Query(() => LoginOutput)
  refreshUser(@Args('data') data: string) {
    return this.authService.refreshUser(data);
  }

  @Mutation(() => Boolean)
  forgotPassword(@Args('data') data: ForgotPasswordInput) {
    return this.authService.forgotPassword(data);
  }

  @Mutation(() => Boolean)
  resetPassword(@Args('data') data: ResetPasswordInput) {
    return this.authService.resetPassword(data);
  }
}
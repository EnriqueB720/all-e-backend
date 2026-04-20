import { UseGuards } from '@nestjs/common';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Throttle } from '@nestjs/throttler';

import { ForgotPasswordInput, ResetPasswordInput, SignUpInput } from './dto';

import { GqlAuthGuard } from './guards';

import { AuthService } from './auth.service';

import { LoginUserInput, LoginOutput } from './dto';

import { GraphQLFields, IGraphQLFields } from '../decorators';

import { User, UserSelect } from 'src/api/user/model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Throttle({ auth: { limit: 5, ttl: 60_000 } })
  @Query(() => LoginOutput)
  login(@Args('data') data: LoginUserInput) {
    return this.authService.login(data);
  }

  @Throttle({ auth: { limit: 3, ttl: 60_000 } })
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

  @Throttle({ auth: { limit: 3, ttl: 60_000 } })
  @Mutation(() => Boolean)
  forgotPassword(@Args('data') data: ForgotPasswordInput) {
    return this.authService.forgotPassword(data);
  }

  @Throttle({ auth: { limit: 5, ttl: 60_000 } })
  @Mutation(() => Boolean)
  resetPassword(@Args('data') data: ResetPasswordInput) {
    return this.authService.resetPassword(data);
  }
}
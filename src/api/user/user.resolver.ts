import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User, UserSelect } from './model';
import { UserService } from './user.service';
import { GraphQLFields, IGraphQLFields } from '@decorators';
import { UserArgs } from './dto';

@Resolver(() => User)
export class UserResolver{

  constructor(private readonly UserService: UserService) {}

  @Query(() => User)
  public async User(
    @Args() args: UserArgs,
    @GraphQLFields() { fields }: IGraphQLFields<UserSelect>
  ): Promise<User> {
    throw "Error";
  }


}
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { OwnershipLog, OwnershipLogSelect } from './model';
import { OwnershipLogService } from './ownership-log.service';
import { GraphQLFields, IGraphQLFields } from '@decorators';
import { OwnershipLogArgs } from './dto';

@Resolver(() => OwnershipLog)
export class OwnershipLogResolver{

  constructor(private readonly ownershipLogService: OwnershipLogService) {}

  @Query(() => OwnershipLog)
  public async OwnershipLog(
    @Args() args: OwnershipLogArgs,
    @GraphQLFields() { fields }: IGraphQLFields<OwnershipLogSelect>
  ): Promise<OwnershipLog> {
    throw "Error";
  }


}
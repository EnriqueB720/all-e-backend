import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Watch, WatchSelect } from './model';
import { WatchService } from './watch.service';
import { GraphQLFields, IGraphQLFields } from '@decorators';
import { WatchArgs } from './dto';

@Resolver(() => Watch)
export class WatchResolver{

  constructor(private readonly watchService: WatchService) {}

  @Query(() => Watch)
  public async watch(
    @Args() args: WatchArgs,
    @GraphQLFields() { fields }: IGraphQLFields<WatchSelect>
  ): Promise<Watch> {
    return this.watchService.findOneWatch(args, fields);
  }


}
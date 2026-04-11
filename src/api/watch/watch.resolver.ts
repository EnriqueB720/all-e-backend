import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Watch, WatchSelect } from './model';
import { WatchService } from './watch.service';
import { GraphQLFields, IGraphQLFields } from '@decorators';
import { WatchArgs, WatchCreateInput, WatchUpdateInput } from './dto';
import { JwtAuthGuard } from '../../shared/auth/guards';

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

  @Query(() => [Watch])
  public async watches(
    @Args() args: WatchArgs,
    @GraphQLFields() { fields }: IGraphQLFields<WatchSelect>
  ): Promise<Watch[]> {
    return this.watchService.findWatches(args, fields);
  }

  @Mutation(() => Watch)
  @UseGuards(JwtAuthGuard)
  public async createWatch(
    @Args('data') args: WatchCreateInput,
    @GraphQLFields() { fields }: IGraphQLFields<WatchSelect>
  ): Promise<Watch> {
    return this.watchService.create(args, fields);
  }

  @Mutation(() => Watch)
  @UseGuards(JwtAuthGuard)
  public async changeWatchOwnership(
    @Args('data') args: WatchUpdateInput,
    @GraphQLFields() { fields }: IGraphQLFields<WatchSelect>
  ): Promise<Watch>{
    return this.watchService.changeOwnership(args.id, args, fields);
  }

}

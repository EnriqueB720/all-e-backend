import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Watch, WatchSelect } from './model';
import { WatchService } from './watch.service';
import { GraphQLFields, IGraphQLFields } from '@decorators';
import { WatchArgs, WatchCreateInput, WatchUpdateInput } from './dto';
import { JwtAuthGuard } from '../../shared/auth/guards';
import { PinataService } from '../../shared/pinata/pinata.service';
import { BlockchainService } from '../../shared/blockchain/blockchain.service';

@Resolver(() => Watch)
export class WatchResolver{

  constructor(
    private readonly watchService: WatchService,
    private readonly pinataService: PinataService,
    private readonly blockchainService: BlockchainService,
  ) {}

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

  @ResolveField(() => String, { nullable: true })
  certificateUrl(@Parent() watch: Watch): string | null {
    if (!watch.metadataURI) return null;
    return this.pinataService.getIpfsUrl(watch.metadataURI);
  }

  @ResolveField(() => String, { nullable: true })
  basescanTxUrl(@Parent() watch: Watch): string | null {
    if (!watch.txHash) return null;
    return this.blockchainService.basescanTxUrl(watch.txHash);
  }

}

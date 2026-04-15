import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { OwnershipLog, OwnershipLogSelect } from './model';
import { OwnershipLogService } from './ownership-log.service';
import { GraphQLFields, IGraphQLFields } from '@decorators';
import { OwnershipLogArgs } from './dto';
import { JwtAuthGuard } from '../../shared/auth/guards';
import { PinataService } from '../../shared/pinata/pinata.service';

@Resolver(() => OwnershipLog)
export class OwnershipLogResolver{

  constructor(
    private readonly ownershipLogService: OwnershipLogService,
    private readonly pinataService: PinataService,
  ) {}

  @Query(() => [OwnershipLog])
  @UseGuards(JwtAuthGuard)
  public async OwnershipLogs(
    @Args() args: OwnershipLogArgs,
    @GraphQLFields() { fields }: IGraphQLFields<OwnershipLogSelect>
  ): Promise<OwnershipLog[]> {
    return this.ownershipLogService.findOwnershipLogsPerWatchId(args, fields);
  }

  @ResolveField(() => String, { nullable: true })
  certificateUrl(@Parent() log: OwnershipLog): string | null {
    if (!log.metadataURI) return null;
    return this.pinataService.getIpfsUrl(log.metadataURI);
  }
}
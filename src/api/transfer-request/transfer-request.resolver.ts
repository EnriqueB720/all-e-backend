import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { TransferRequest } from './model';
import { TransferRequestService } from './transfer-request.service';
import { CancelTransferRequestInput, CreateTransferRequestInput, RespondTransferRequestInput } from './dto';
import { JwtAuthGuard } from '../../shared/auth/guards';

@Resolver(() => TransferRequest)
@UseGuards(JwtAuthGuard)
export class TransferRequestResolver {
  constructor(private readonly transferRequestService: TransferRequestService) {}

  @Mutation(() => TransferRequest)
  async createTransferRequest(
    @Args('data') data: CreateTransferRequestInput,
  ): Promise<TransferRequest> {
    return this.transferRequestService.create(data);
  }

  @Mutation(() => TransferRequest)
  async respondToTransferRequest(
    @Args('data') data: RespondTransferRequestInput,
  ): Promise<TransferRequest> {
    return this.transferRequestService.respond(data);
  }

  @Mutation(() => TransferRequest)
  async cancelTransferRequest(
    @Args('data') data: CancelTransferRequestInput,
  ): Promise<TransferRequest> {
    return this.transferRequestService.cancel(data);
  }

  @Query(() => [TransferRequest])
  async pendingTransferRequests(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<TransferRequest[]> {
    return this.transferRequestService.findPendingForUser(userId);
  }

  @Query(() => [TransferRequest])
  async sentTransferRequests(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<TransferRequest[]> {
    return this.transferRequestService.findSentByUser(userId);
  }
}

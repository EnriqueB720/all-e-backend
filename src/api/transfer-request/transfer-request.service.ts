import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-datasource';
import { CancelTransferRequestInput, CreateTransferRequestInput, RespondTransferRequestInput } from './dto';
import { WatchService } from '../watch/watch.service';

@Injectable()
export class TransferRequestService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly watchService: WatchService,
  ) {}

  async create(data: CreateTransferRequestInput) {
    const watch = await this.prismaService.watch.findUnique({
      where: { id: data.watchId },
    });

    if (!watch || watch.ownerId !== data.fromUserId) {
      throw new BadRequestException('You do not own this watch');
    }

    const toUser = await this.prismaService.user.findUnique({
      where: { email: data.toUserEmail.toLowerCase() },
    });

    if (!toUser) {
      throw new BadRequestException('Recipient user not found');
    }

    if (toUser.id === data.fromUserId) {
      throw new BadRequestException('Cannot transfer to yourself');
    }

    const existing = await this.prismaService.transferRequest.findFirst({
      where: { watchId: data.watchId, status: 'PENDING' },
    });

    if (existing) {
      throw new BadRequestException('A pending transfer request already exists for this watch');
    }

    return this.prismaService.transferRequest.create({
      data: {
        watchId: data.watchId,
        fromUserId: data.fromUserId,
        toUserId: toUser.id,
      },
      include: { watch: true, fromUser: true, toUser: true },
    });
  }

  async respond(data: RespondTransferRequestInput) {
    const request = await this.prismaService.transferRequest.findUnique({
      where: { id: data.transferRequestId },
      include: { watch: true },
    });

    if (!request) {
      throw new BadRequestException('Transfer request not found');
    }

    if (request.toUserId !== data.userId) {
      throw new BadRequestException('You are not the recipient of this transfer');
    }

    if (request.status !== 'PENDING') {
      throw new BadRequestException('This transfer request has already been processed');
    }

    if (data.accept) {
      await this.watchService.changeOwnership(request.watchId, {
        id: request.watchId,
        ownerId: request.toUserId,
        serialNum: request.watch.serialNum,
        metadataURI: request.watch.metadataURI || '',
        lastSynced: new Date(),
      }, { select: { id: true } });
    }

    return this.prismaService.transferRequest.update({
      where: { id: data.transferRequestId },
      data: { status: data.accept ? 'ACCEPTED' : 'REJECTED' },
      include: { watch: true, fromUser: true, toUser: true },
    });
  }

  async cancel(data: CancelTransferRequestInput) {
    const request = await this.prismaService.transferRequest.findUnique({
      where: { id: data.transferRequestId },
    });

    if (!request) {
      throw new BadRequestException('Transfer request not found');
    }

    if (request.fromUserId !== data.userId) {
      throw new BadRequestException('You are not the sender of this transfer');
    }

    if (request.status !== 'PENDING') {
      throw new BadRequestException('Only pending transfers can be cancelled');
    }

    return this.prismaService.transferRequest.update({
      where: { id: data.transferRequestId },
      data: { status: 'CANCELLED' },
      include: { watch: true, fromUser: true, toUser: true },
    });
  }

  async findPendingForUser(userId: number) {
    return this.prismaService.transferRequest.findMany({
      where: { toUserId: userId, status: 'PENDING' },
      include: {
        watch: true,
        fromUser: { select: { id: true, username: true, email: true } },
        toUser: { select: { id: true, username: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findSentByUser(userId: number) {
    return this.prismaService.transferRequest.findMany({
      where: { fromUserId: userId },
      include: {
        watch: true,
        fromUser: { select: { id: true, username: true, email: true } },
        toUser: { select: { id: true, username: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}

import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { Watch, WatchSelect } from './model';

import { WatchArgs, WatchCreateInput, WatchUpdateInput } from './dto';

import { PrismaService } from '@prisma-datasource';
import { OwnershipLogService } from '../ownership-log/ownership-log.service';
import { PinataService } from '../../shared/pinata/pinata.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WatchService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly ownershipLogService: OwnershipLogService,
    private readonly pinataService: PinataService,
  ) {}

  public async findOneWatch(
    { where }: WatchArgs,
    { select }: WatchSelect,
  ): Promise<Watch> {
    const cleanWhere = Object.fromEntries(
      Object.entries(where).filter(([_, v]) => v != null && v !== 0),
    );

    return this.prismaService.watch.findFirst({
      where: cleanWhere,
      select,
    });
  }


  public async findWatches(
    { where }: WatchArgs,
    { select }: WatchSelect,
  ): Promise<Watch[]> {
    const { username, walletAddress, ...rest } = where;

    const cleanWhere: any = Object.fromEntries(
      Object.entries(rest).filter(([_, v]) => v != null && v !== 0),
    );

    if (username || walletAddress) {
      cleanWhere.user = {};
      if (username) cleanWhere.user.username = username;
      if (walletAddress) cleanWhere.user.walletAddress = walletAddress;
    }

    if (Object.keys(cleanWhere).length === 0) {
      throw new BadRequestException(
        'At least one filter is required (serialNum, username, walletAddress, or ownerId)',
      );
    }

    return this.prismaService.watch.findMany({
      where: cleanWhere,
      select,
      take: 100,
    });
  }

  public async create(
    data: WatchCreateInput,
    { select }: WatchSelect,
  ): Promise<Watch> {
    try {
      const owner = await this.prismaService.user.findUnique({
        where: { id: data.ownerId },
        select: { username: true, walletAddress: true },
      });

      if (!owner) {
        throw new BadRequestException('Owner not found');
      }

      const cid = await this.pinataService.uploadWatchMetadata({
        serialNum: data.serialNum,
        ownerWallet: owner.walletAddress ?? '',
        registeredAt: new Date().toISOString(),
        ownerUsername: owner.username,
      });

      const created = await this.prismaService.watch.create({
        data:{
          ...data,
          metadataURI: cid,
          ownershipLog:{
            create:{
              ownerId: data.ownerId,
              timestamp: new Date(Date.now())
            }
          }
        },
        select: { ...(select ?? {}), id: true }
      });

      return created as any;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const field = (error.meta?.target as string[])?.join(', ');
          if (field?.includes('serial_num')) {
            throw new ConflictException('A watch with this serial number is already registered');
          }
          throw new ConflictException(`A watch with this ${field} already exists`);
        }
      }
      throw error;
    }
  }

  public async changeOwnership(
    id: number,
    data: WatchUpdateInput,
    { select }: WatchSelect,
  ): Promise<Watch> {

    let ownershipLogId = await this.ownershipLogService.createOwnership({
      ownerId: data.ownerId,
      watchId: data.id
    },{
      select:{
        id: true
      }
    });

    if(!ownershipLogId){
      throw new BadRequestException('The ownership history could not be updated');
    }

    const watch = await this.prismaService.watch.findUnique({
      where: { id },
      select: { serialNum: true },
    });

    const newOwner = await this.prismaService.user.findUnique({
      where: { id: data.ownerId },
      select: { username: true, walletAddress: true },
    });

    if (!newOwner) {
      throw new BadRequestException('The new owner could not be found');
    }

    const cid = await this.pinataService.uploadWatchMetadata({
      serialNum: watch.serialNum,
      ownerWallet: newOwner.walletAddress ?? '',
      registeredAt: new Date().toISOString(),
      ownerUsername: newOwner.username,
    });

    return this.prismaService.watch.update({
      data: { ...data, metadataURI: cid },
      select,
      where: { id },
    });
  }
}

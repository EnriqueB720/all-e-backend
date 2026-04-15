import { Injectable } from '@nestjs/common';

import { OwnershipLog, OwnershipLogSelect } from './model';

import { OwnershipLogArgs, OwnershipLogCreateInput } from './dto';

import { PrismaService } from '@prisma-datasource';

@Injectable()
export class OwnershipLogService {
  constructor(private readonly prismaService: PrismaService) {}

    public async findOwnershipLogsPerWatchId(
      { where }: OwnershipLogArgs,
      { select }: OwnershipLogSelect,
    ): Promise<OwnershipLog[]>{
      return this.prismaService.ownershipLog.findMany({
        where,
        select
      });
    }

    public async createOwnership(
      {watchId, ownerId, metadataURI}: OwnershipLogCreateInput,
      { select }: OwnershipLogSelect,
    ): Promise<OwnershipLog> {

      return this.prismaService.ownershipLog.create({
        data:{
          timestamp: new Date(Date.now()),
          metadataURI: metadataURI ?? null,
          watch: { connect: { id: watchId } },
          owner: { connect: { id: ownerId } },
        },
        select
      });
    }
}
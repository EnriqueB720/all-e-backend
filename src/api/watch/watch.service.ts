import { Injectable } from '@nestjs/common';

import { Watch, WatchSelect } from './model';

import { WatchArgs, WatchCreateInput, WatchWhereInput } from './dto';

import { PrismaService } from '@prisma-datasource';

@Injectable()
export class WatchService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findOneWatch(
    { where }: WatchArgs,
    { select }: WatchSelect,
  ): Promise<Watch> {
    return this.prismaService.watch.findFirst({
      where,
      select,
    });
  }


  public async create(
    data: WatchCreateInput,
    { select }: WatchSelect,
  ): Promise<Watch> {
    return this.prismaService.watch.create({
      data:{
        ...data,
        ownershipLog:{//Creates ownership log directly
          create:{
            ownerId: data.ownerId,
            timestamp: new Date(Date.now())
          }
        }
      },
      select
    });
  }
}

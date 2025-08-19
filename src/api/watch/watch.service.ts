import { BadRequestException, Injectable } from '@nestjs/common';

import { Watch, WatchSelect } from './model';

import { WatchArgs, WatchCreateInput, WatchUpdateInput } from './dto';

import { PrismaService } from '@prisma-datasource';
import { OwnershipLogService } from '../ownership-log/ownership-log.service';

@Injectable()
export class WatchService {
  constructor(private readonly prismaService: PrismaService, private readonly ownershipLogService: OwnershipLogService) {}

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

    return this.prismaService.watch.update({
      data,
      select,
      where:{
        id
      }
    });
  }
}

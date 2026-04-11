import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { Watch, WatchSelect } from './model';

import { WatchArgs, WatchCreateInput, WatchUpdateInput } from './dto';

import { PrismaService } from '@prisma-datasource';
import { OwnershipLogService } from '../ownership-log/ownership-log.service';
import { Prisma } from '@prisma/client';

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
    try {
      return await this.prismaService.watch.create({
        data:{
          ...data,
          ownershipLog:{
            create:{
              ownerId: data.ownerId,
              timestamp: new Date(Date.now())
            }
          }
        },
        select
      });
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

    return this.prismaService.watch.update({
      data,
      select,
      where:{
        id
      }
    });
  }
}

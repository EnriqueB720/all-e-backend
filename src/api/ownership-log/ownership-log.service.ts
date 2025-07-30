import { Injectable } from '@nestjs/common';

import { OwnershipLog, OwnershipLogSelect } from './model';

import { OwnershipLogArgs, OwnershipLogCreateInput, OwnershipLogWhereInput } from './dto';

import { PrismaService } from '@prisma-datasource';

@Injectable()
export class OwnershipLogService {
  constructor(private readonly prismaService: PrismaService) {}

}
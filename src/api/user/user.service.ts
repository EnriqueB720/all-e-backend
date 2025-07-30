import { Injectable } from '@nestjs/common';

import { User, UserSelect } from './model';

import { UserArgs, UserCreateInput, UserWhereInput } from './dto';

import { PrismaService } from '@prisma-datasource';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

}
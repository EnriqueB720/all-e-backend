import { ConflictException, Injectable } from '@nestjs/common';

import { User, UserSelect } from './model';

import { UserArgs, UserCreateInput, UserUpdateInput, UserWhereInput } from './dto';

import { PrismaService } from '@prisma-datasource';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

   public async findOne(
    { where }: UserArgs,
    { select }: UserSelect,
  ): Promise<User> {
    return this.prismaService.user.findFirst({
      where,
      select,
    });
  }

  public async findUserPassword({ where:{ email } }: UserArgs) {
    const user = await this.prismaService.user.findUnique({
      where:{
        email
      },
    });
    return user ? user.password : null;
  }

  public async create(
    data: UserCreateInput,
    { select }: UserSelect,
  ): Promise<User> {
    return this.prismaService.user.create({
      data,
      select,
    });
  }

  public async update(
    { id, ...data }: UserUpdateInput,
    { select }: UserSelect,
  ): Promise<User> {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data,
        select,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('This wallet address is already in use by another account');
      }
      throw error;
    }
  }
}
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User, UserSelect } from './model';

import { UserArgs, UserCreateInput, UserUpdateInput } from './dto';

import { PrismaService } from '@prisma-datasource';

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
    data: UserUpdateInput,
    { select }: UserSelect,
  ): Promise<User> {
    const updateData: any = {};

    if (data.username) {
      updateData.username = data.username;
    }

    if (data.newPassword) {
      if (!data.currentPassword) {
        throw new BadRequestException('Current password is required to set a new password');
      }
      const user = await this.prismaService.user.findUnique({
        where: { id: data.id },
        select: { password: true },
      });
      const valid = await bcrypt.compare(data.currentPassword, user.password);
      if (!valid) {
        throw new BadRequestException('Current password is incorrect');
      }
      updateData.password = await bcrypt.hash(data.newPassword, 10);
    }

    return this.prismaService.user.update({
      where: { id: data.id },
      data: updateData,
      select,
    });
  }

}
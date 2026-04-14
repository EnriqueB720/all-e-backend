import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { BadRequestException, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { ForgotPasswordInput, LoginOutput, LoginUserInput, ResetPasswordInput, SignUpInput } from './dto';

import { UserSelect } from 'src/api/user/model';

import { User } from 'src/api/user/model/user.model';

import { UserService } from 'src/api/user/user.service';
import { PrismaService } from '@prisma-datasource';
import { ResendService } from '../resend/resend.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private resendService: ResendService,
    private configService: ConfigService,
  ) { }

  async forgotPassword({ email }: ForgotPasswordInput): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) return true;

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { resetToken: token, resetTokenExpiry: expiry },
    });

    const appUrl = this.configService.get('APP_URL') as string;
    await this.resendService.sendPasswordReset(email, `${appUrl}/reset-password?token=${token}`);
    return true;
  }

  async resetPassword({ token, newPassword }: ResetPasswordInput): Promise<boolean> {
    const user = await this.prismaService.user.findFirst({ where: { resetToken: token } });
    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const password = await bcrypt.hash(newPassword, 10);
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { password, resetToken: null, resetTokenExpiry: null },
    });
    return true;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userService.findOne(
        {
          where: {
            email,
          },
        },
        {
          select: {
            id: true,
            email: true,
            username: true,
            language: true,
            createdAt: true,
            watch: {
              select: {
                id: true,
                serialNum: true,
                metadataURI: true,
                ownerId: true,
                lastSynced: true
              }
            }
          },
        },
      );

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const userPassword = await this.userService.findUserPassword({
        where: { email },
      });

      const valid = await bcrypt.compare(password, userPassword);

      if (!valid) {
        throw new Error('Invalid email or password');
      }

      return user && valid ? user : null;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An error occurred during login');
    }
  }

  async login({ email, password }: LoginUserInput) {

    const user = await this.validateUser(email, password);

    if (!user) return null;
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000),
      }),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
      user,
    } as LoginOutput;
  }

  async signup(signUpInput: SignUpInput, select: UserSelect) {
    const userPassword = await this.userService.findUserPassword({
      where: {
        email: signUpInput.email,
      },
    });

    if (userPassword) {
      throw new Error('User already exists!');
    }

    const password = await bcrypt.hash(signUpInput.password, 10);

    return this.userService.create(
      {
        ...signUpInput,
        password,
      },
      {
        ...select,
      },
    );
  }

  async refreshUser(token: string) {

    let token_decoded = this.jwtService.decode(token);

    if (new Date() > new Date(token_decoded.expiresAt)) {
      return null;
    } else {

      let user = await this.userService.findOne({
        where: {
          email: token_decoded.email,
        }
      },
        {
          select: {
            id: true,
            email: true,
            username: true,
            language: true,
            createdAt: true,
            watch: {
              select: {
                id: true,
                serialNum: true,
                metadataURI: true,
                ownerId: true,
                lastSynced: true
              }
            }
          },
        });

      return {
        access_token: this.jwtService.sign({
          email: user.email,
          sub: user.id,
          expiresIn: '1h',
          expiresAt: new Date(Date.now() + 60 * 60 * 1000)
        }),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        user,
      } as LoginOutput;
    }
  }
}
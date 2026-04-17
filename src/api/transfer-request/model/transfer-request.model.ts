import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/api/user/model';
import { Watch } from 'src/api/watch/model';

@ObjectType()
export class TransferRequest {
  @Field(() => Number)
  id?: number;

  @Field(() => Number)
  watchId?: number;

  @Field(() => Number)
  fromUserId?: number;

  @Field(() => Number)
  toUserId?: number;

  @Field(() => String)
  status?: string;

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Watch, { nullable: true })
  watch?: Watch;

  @Field(() => User, { nullable: true })
  fromUser?: User;

  @Field(() => User, { nullable: true })
  toUser?: User;
}

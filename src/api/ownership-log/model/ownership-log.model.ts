import { Field, ObjectType } from '@nestjs/graphql';
import { Watch } from 'src/api/watch/model';
import { User } from 'src/api/user/model';

@ObjectType()
export class OwnershipLog {
  @Field(() => Number)
  id?: number;

  @Field(() => Number)
  ownerId?: number;

  @Field(() => Number)
  watchId?: number;

  @Field(() => String, { nullable: true })
  metadataURI?: string | null;

  @Field(() => String, { nullable: true })
  certificateUrl?: string | null;

  @Field(() => Date)
  timestamp?: Date;

  @Field(() => Watch, {nullable: true})
  watch?: Watch;

  @Field(() => User, { nullable: true })
  owner?: User;
}

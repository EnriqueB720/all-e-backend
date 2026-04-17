import { Field, ObjectType } from '@nestjs/graphql';
import { OwnershipLog } from 'src/api/ownership-log/model';
import { User } from 'src/api/user/model';

@ObjectType()
export class Watch {
  @Field(() => Number)
  id?: number;

  @Field(() => Number)
  ownerId?: number;

  @Field(() => String, { nullable: true })
  serialNum?: string;

  @Field(() => String, { nullable: true })
  brand?: string;

  @Field(() => String, { nullable: true })
  model?: string;

  @Field(() => String, { nullable: true })
  referenceNumber?: string;

  @Field(() => Number, { nullable: true })
  yearOfProduction?: number;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => String, {  nullable: true  })
  metadataURI?: string;

  @Field(() => Date)
  lastSynced?: Date;

  @Field(() => [OwnershipLog], {nullable: true})
  ownershipLog?: OwnershipLog[];

  @Field(() => User, {nullable: true})
  user?: User;

  @Field(() => String, { nullable: true })
  certificateUrl?: string;
}

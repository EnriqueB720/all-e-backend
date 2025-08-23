import { Field, ObjectType } from '@nestjs/graphql';
import { OwnershipLog } from 'src/api/ownership-log/model';
import { User } from 'src/api/user/model';

@ObjectType()
export class Watch {
  @Field(() => Number)
  id?: number;

  @Field(() => Number)
  ownerId?: number;

  @Field(() => Number, { nullable: true })
  serialNum?: number;

  @Field(() => String, {  nullable: true  })
  metadataURI?: string;

  @Field(() => Date)
  lastSynced?: Date;

  @Field(() => [OwnershipLog], {nullable: true})
  ownershipLog?: OwnershipLog[];
  
  @Field(() => User, {nullable: true})
  user?: User;
}
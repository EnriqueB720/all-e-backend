import { Field, ObjectType } from '@nestjs/graphql';
import { Watch } from 'src/api/watch/model';

@ObjectType()
export class OwnershipLog {
  @Field(() => Number)
  id?: number;

  @Field(() => Number)
  ownerId?: number;

  @Field(() => Number)
  watchId?: number;

  @Field(() => Date)
  timestamp?: Date;

  @Field(() => Watch, {nullable: true})
  watch?: Watch;
}
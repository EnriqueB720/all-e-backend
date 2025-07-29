import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WatchCreateInput {
  @Field(() => Int)
  ownerId: number;

  @Field(() => Int, { nullable: true })
  serialNum: number;

  @Field(() => String, {  nullable: true  })
  metadataURI: string;

  @Field(() => Date)
  lastSynced: Date;
}
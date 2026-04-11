import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WatchCreateInput {
  @Field(() => Int)
  ownerId: number;

  @Field(() => String, { nullable: true })
  serialNum: string;

  @Field({  nullable: true  })
  metadataURI: string;

  @Field(() => Date)
  lastSynced: Date;
}

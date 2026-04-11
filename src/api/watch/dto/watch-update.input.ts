import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WatchUpdateInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  ownerId: number;

  @Field(() => String)
  serialNum: string;

  @Field()
  metadataURI: string;

  @Field(() => Date)
  lastSynced: Date;
}

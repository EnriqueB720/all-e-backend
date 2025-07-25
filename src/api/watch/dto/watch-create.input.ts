import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class WatchCreateInput {
  @Field(() => Number)
  ownerId: number;

  @Field(() => Number, { nullable: true })
  serialNum: number;

  @Field(() => String, {  nullable: true  })
  metadataURI: string;

  @Field(() => Date)
  lastSynced: Date;
}
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class WatchWhereInput {
  @Field(() => Number)
  ownerId?: number;

  @Field(() => Number, { nullable: true })
  serialNum?: number;

  @Field(() => String, {  nullable: true  })
  metadataURI?: string;

  @Field(() => Date)
  lastSynced?: Date;
}
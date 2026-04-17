import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WatchCreateInput {
  @Field(() => Int)
  ownerId: number;

  @Field(() => String, { nullable: true })
  serialNum: string;

  @Field(() => String, { nullable: true })
  brand?: string;

  @Field(() => String, { nullable: true })
  model?: string;

  @Field(() => String, { nullable: true })
  referenceNumber?: string;

  @Field(() => Int, { nullable: true })
  yearOfProduction?: number;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field({  nullable: true  })
  metadataURI: string;

  @Field(() => Date)
  lastSynced: Date;
}

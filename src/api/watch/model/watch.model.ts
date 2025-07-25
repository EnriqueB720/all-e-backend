import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Watch {
  @Field(() => Number)
  id: number;

  @Field(() => Number)
  ownerId: number;

  @Field(() => Number, { nullable: true })
  serialNum?: number;

  @Field(() => String, {  nullable: true  })
  metadataURI?: string;

  @Field(() => Date)
  lastSynced: Date;

  //TODO Ownership Log property
  //TODO User binding property
}
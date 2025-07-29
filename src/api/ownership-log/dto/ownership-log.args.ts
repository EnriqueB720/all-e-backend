import { ArgsType, Field } from '@nestjs/graphql';
import { OwnershipLogWhereInput } from './ownership-log-where.input';

@ArgsType()
export class OwnershipLogArgs {
  @Field(() => OwnershipLogWhereInput)
  where: OwnershipLogWhereInput;
}
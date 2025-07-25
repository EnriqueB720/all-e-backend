import { ArgsType, Field } from '@nestjs/graphql';
import { WatchWhereInput } from './watch-where.input';

@ArgsType()
export class UserArgs {
  @Field(() => WatchWhereInput)
  where: WatchWhereInput;
}
import { ArgsType, Field } from '@nestjs/graphql';
import { WatchWhereInput } from './watch-where.input';

@ArgsType()
export class WatchArgs {
  @Field(() => WatchWhereInput)
  where: WatchWhereInput;
}
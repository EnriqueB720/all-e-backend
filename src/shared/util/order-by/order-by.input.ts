import { registerEnumType } from '@nestjs/graphql';

export enum OrderByArg {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(OrderByArg, {
  name: 'OrderByArg',
});
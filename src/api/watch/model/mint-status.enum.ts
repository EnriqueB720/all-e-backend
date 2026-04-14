import { registerEnumType } from '@nestjs/graphql';
import { MintStatus } from '@prisma/client';

registerEnumType(MintStatus, {
  name: 'MintStatus',
  description: 'On-chain mint lifecycle for a watch NFT',
});

export { MintStatus };

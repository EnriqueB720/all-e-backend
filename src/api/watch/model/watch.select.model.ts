import { OwnershipLogSelect } from "src/api/ownership-log/model";

interface WatchPrismaSelect{
  id?: boolean;
  ownerId?: boolean;
  serialNum?: boolean;
  metadataURI?: boolean;
  lastSynced?: boolean;
  ownershipLog?: OwnershipLogSelect;
}


export interface WatchSelect {
  select?: WatchPrismaSelect;
}
  
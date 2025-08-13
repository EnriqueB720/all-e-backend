import { OwnershipLogSelect } from "src/api/ownership-log/model";
import { UserSelect } from "src/api/user/model";

interface WatchPrismaSelect{
  id?: boolean;
  ownerId?: boolean;
  serialNum?: boolean;
  metadataURI?: boolean;
  lastSynced?: boolean;
  ownershipLog?: OwnershipLogSelect;
  user?: UserSelect;
}


export interface WatchSelect {
  select?: WatchPrismaSelect;
}
  
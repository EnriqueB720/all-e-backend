import { WatchSelect } from "src/api/watch/model";
import { UserSelect } from "src/api/user/model";

interface OwnershipLogPrismaSelect{
  id?: boolean;
  ownerId?: boolean;
  watchId?: boolean;
  metadataURI?: boolean;
  timestamp?: boolean;
  watch?: WatchSelect;
  owner?: UserSelect;
}


export interface OwnershipLogSelect {
  select?: OwnershipLogPrismaSelect;
}

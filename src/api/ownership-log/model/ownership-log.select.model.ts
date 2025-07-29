import { WatchSelect } from "src/api/watch/model";

interface OwnershipLogPrismaSelect{
  id?: boolean;
  ownerId?: boolean;
  watchId?: boolean;
  timestamp?: boolean;
  watch?: WatchSelect;
}


export interface OwnershipLogSelect {
  select?: OwnershipLogPrismaSelect;
}
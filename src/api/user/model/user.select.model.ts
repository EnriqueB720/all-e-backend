import { WatchSelect } from "src/api/watch/model";

interface UserPrismaSelect{
  id?: boolean;
  walletAddress?: boolean;
  email?: boolean;
  username?: boolean;
  createdAt?: boolean;
  watch?: WatchSelect;
}


export interface UserSelect {
  select?: UserPrismaSelect;
}
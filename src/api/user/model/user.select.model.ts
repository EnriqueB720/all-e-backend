import { WatchSelect } from "src/api/watch/model";

interface UserPrismaSelect{
  id?: boolean;
  email?: boolean;
  username?: boolean;
  createdAt?: boolean;
  language?: boolean;
  watch?: WatchSelect;
}


export interface UserSelect {
  select?: UserPrismaSelect;
}
interface WatchPrismaSelect{
  id?: boolean;
  ownerId?: boolean;
  serialNum?: boolean;
  metadataURI?: boolean;
  lastSynced?: boolean;
  ownershipLog?: boolean;
}


export interface WatchSelect {
  select?: WatchPrismaSelect;
}
  
export const MINT_QUEUE = 'mint';
export const MINT_JOB = 'mint-watch';
export const TRANSFER_JOB = 'transfer-watch';

export interface MintJobData {
  watchId: number;
}

export interface TransferJobData {
  watchId: number;
  fromAddress: string;
  toAddress: string;
}

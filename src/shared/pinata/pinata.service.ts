import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PinataSDK } from 'pinata';
import { ConfigService } from '../config/config.service';

export interface WatchMetadata {
  serialNum: string;
  brand?: string | null;
  model?: string | null;
  referenceNumber?: string | null;
  yearOfProduction?: number | null;
  registeredAt: string;
  ownerUsername: string;
  previousCid?: string | null;
}

@Injectable()
export class PinataService {
  private pinata: PinataSDK;

  constructor(private readonly configService: ConfigService) {
    this.pinata = new PinataSDK({
      pinataJwt: this.configService.get('PINATA_JWT') as string,
      pinataGateway: this.configService.get('PINATA_GATEWAY') as string,
    });
  }

  async uploadWatchMetadata(metadata: WatchMetadata): Promise<string> {
    try {
      const result = await this.pinata.upload.public.json(metadata)
        .name(`watch-${metadata.serialNum}`);
      return result.cid;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to upload metadata to IPFS: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  getIpfsUrl(cid: string): string {
    const gateway = this.configService.get('PINATA_GATEWAY') as string;
    return `https://${gateway}/ipfs/${cid}`;
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { Contract, JsonRpcProvider, Wallet, TransactionReceipt } from 'ethers';
import { ConfigService } from '../config/config.service';
import { ALL_E_WATCH_ABI } from './abi/all-e-watch.abi';

export interface MintResult {
  txHash: string;
  tokenId: string;
  blockNumber: number;
}

@Injectable()
export class BlockchainService {
  private readonly logger = new Logger(BlockchainService.name);
  private readonly provider: JsonRpcProvider;
  private readonly signer: Wallet;
  private readonly contract: Contract;

  constructor(private readonly configService: ConfigService) {
    const rpcUrl = this.configService.get('BASE_SEPOLIA_RPC_URL') as string;
    const pk = this.configService.get('DEPLOYER_PRIVATE_KEY') as string;
    const contractAddress = this.configService.get('WATCH_CONTRACT_ADDRESS') as string;

    this.provider = new JsonRpcProvider(rpcUrl);
    this.signer = new Wallet(pk, this.provider);
    this.contract = new Contract(contractAddress, ALL_E_WATCH_ABI, this.signer);
  }

  get deployerAddress(): string {
    return this.signer.address;
  }

  /**
   * Mint an NFT to `toAddress` with tokenId = watch DB id.
   * Waits for 1 confirmation before resolving.
   */
  async mintWatch(params: {
    toAddress: string;
    tokenId: number;
    metadataCid: string;
  }): Promise<MintResult> {
    const { toAddress, tokenId, metadataCid } = params;
    const tokenUri = `ipfs://${metadataCid}`;

    this.logger.log(
      `Minting tokenId=${tokenId} to=${toAddress} uri=${tokenUri}`,
    );

    const tx = await this.contract.safeMint(toAddress, tokenId, tokenUri);
    this.logger.log(`Tx sent: ${tx.hash} — waiting for confirmation`);

    const receipt: TransactionReceipt = await tx.wait(1);
    if (!receipt || receipt.status !== 1) {
      throw new Error(`Mint tx reverted: ${tx.hash}`);
    }

    this.logger.log(`Mint confirmed in block ${receipt.blockNumber}`);
    return {
      txHash: tx.hash,
      tokenId: tokenId.toString(),
      blockNumber: receipt.blockNumber,
    };
  }

  /**
   * Transfer an existing NFT. Requires the current on-chain owner to have
   * previously called setApprovalForAll(deployer, true), otherwise the tx
   * will revert. The frontend prompts the user to sign that approval once.
   */
  async transferWatch(params: {
    fromAddress: string;
    toAddress: string;
    tokenId: number;
  }): Promise<MintResult> {
    const { fromAddress, toAddress, tokenId } = params;
    this.logger.log(
      `Transferring tokenId=${tokenId} from=${fromAddress} to=${toAddress}`,
    );

    const tx = await this.contract.transferFrom(fromAddress, toAddress, tokenId);
    const receipt: TransactionReceipt = await tx.wait(1);
    if (!receipt || receipt.status !== 1) {
      throw new Error(`Transfer tx reverted: ${tx.hash}`);
    }

    return {
      txHash: tx.hash,
      tokenId: tokenId.toString(),
      blockNumber: receipt.blockNumber,
    };
  }

  basescanTxUrl(txHash: string): string {
    return `https://sepolia.basescan.org/tx/${txHash}`;
  }
}

export type VaultType = 'Copy' | 'Group' | 'Time-Locked';

export interface Vault {
  id: string;
  name: string;
  type: VaultType;
  creator: string;
  createdAt: Date;
  members: Member[];
  totalValue: number;
  isActive: boolean;
  unlockTimestamp?: number;
}

export interface Member {
  id: string;
  address: string;
  joinedAt: Date;
  contribution: number;
  sharePercentage?: number;
  isFollowing?: boolean;
  nickname: string;
}

export interface CreateVaultData {
  name: string;
  type: VaultType;
  unlockDuration?: number;
}
import { Vault, Member } from '../types';

export const mockMembers: Member[] = [
  {
    id: '1',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    joinedAt: new Date('2024-01-15'),
    contribution: 0.5,
    sharePercentage: 25,
    isFollowing: true,
    nickname: 'CryptoNinja'
  },
  {
    id: '2',
    address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
    joinedAt: new Date('2024-01-16'),
    contribution: 1.2,
    sharePercentage: 35,
    isFollowing: false,
    nickname: 'MoonRider'
  },
  {
    id: '3',
    address: 'bc1qtest123456789abcdef',
    joinedAt: new Date('2024-01-17'),
    contribution: 0.8,
    sharePercentage: 20,
    isFollowing: true,
    nickname: 'WhaleWatcher'
  },
  {
    id: '4',
    address: 'bc1qanother987654321xyz',
    joinedAt: new Date('2024-01-18'),
    contribution: 2.1,
    sharePercentage: 40,
    isFollowing: true,
    nickname: 'DiamondHands'
  }
];

export const mockVaults: Vault[] = [
  {
    id: 'alpha-vault',
    name: 'Alpha Vault',
    type: 'Copy',
    creator: 'SatoshiLover',
    createdAt: new Date('2024-01-15'),
    members: mockMembers.slice(0, 3),
    totalValue: 495480,
    isActive: true
  },
  {
    id: 'beta-vault',
    name: 'Beta Vault',
    type: 'Copy',
    creator: 'WhaleWatcher',
    createdAt: new Date('2024-01-14'),
    members: mockMembers.slice(0, 2),
    totalValue: 661199,
    isActive: true
  },
  {
    id: 'gamma-vault',
    name: 'Gamma Vault',
    type: 'Copy',
    creator: 'TeamPlayer',
    createdAt: new Date('2024-01-13'),
    members: mockMembers,
    totalValue: 349265,
    isActive: true
  },
  {
    id: 'delta-vault',
    name: 'Delta Vault',
    type: 'Group',
    creator: 'RocketMan',
    createdAt: new Date('2024-01-12'),
    members: [mockMembers[0], mockMembers[3]],
    totalValue: 530510,
    isActive: true
  },
  {
    id: 'epsilon-vault',
    name: 'Epsilon Vault',
    type: 'Group',
    creator: 'CaptainBitcoin',
    createdAt: new Date('2024-01-11'),
    members: mockMembers.slice(1, 3),
    totalValue: 665376,
    isActive: true
  },
  {
    id: 'zeta-vault',
    name: 'Zeta Vault',
    type: 'Time-Locked',
    creator: 'GoldKing',
    createdAt: new Date('2024-01-10'),
    members: mockMembers.slice(0, 2),
    totalValue: 120424,
    isActive: true,
    unlockTimestamp: Date.now() + (30 * 24 * 60 * 60 * 1000)
  }
];

export const generateVaultId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
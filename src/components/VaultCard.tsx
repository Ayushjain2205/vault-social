import React from 'react';
import { Users, Clock, Copy, Users as GroupIcon, TrendingUp } from 'lucide-react';
import { Vault } from '../types';
import { Vault as VaultIcon } from './Vault';

interface VaultCardProps {
  vault: Vault;
  onClick: () => void;
}

const VaultCard: React.FC<VaultCardProps> = ({ vault, onClick }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Copy':
        return <Copy className="w-4 h-4" />;
      case 'Group':
        return <GroupIcon className="w-4 h-4" />;
      case 'Time-Locked':
        return <Clock className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Copy':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Group':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Time-Locked':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getSpecialBadges = () => {
    const badges = [];
    
    if (vault.totalValue > 500000) {
      badges.push(
        <span key="whale" className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-cyan-100 text-cyan-700 border border-cyan-200">
          🐋 Whale Vault
        </span>
      );
    }
    
    if (vault.members.length >= 4) {
      badges.push(
        <span key="popular" className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-pink-100 text-pink-700 border border-pink-200">
          🔥 Popular
        </span>
      );
    }
    
    if (vault.totalValue > 600000) {
      badges.push(
        <span key="top-performer" className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">
          ⭐ Top Performer
        </span>
      );
    }
    
    return badges;
  };

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-3xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-gray-100 hover:border-blue-200 hover:-translate-y-2 hover:scale-105"
    >
      {/* Vault Icon and Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <VaultIcon seed={vault.id} size="logo" />
          <div>
            <h3 className="text-xl font-playful font-bold text-gray-800 mb-1">
              {vault.name}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${getTypeBadgeColor(vault.type)}`}>
                {getTypeIcon(vault.type)}
                <span className="ml-1">{vault.type === 'Time-Locked' ? 'Locked' : vault.type}</span>
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-700 border border-green-200">
                ● Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Special Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {getSpecialBadges()}
      </div>

      {/* Total Value */}
      <div className="mb-4">
        <div className="text-3xl font-playful font-bold text-gray-800">
          {formatValue(vault.totalValue)}
        </div>
        <div className="text-sm text-gray-500 font-medium">
          Total Value
        </div>
      </div>

      {/* Members and Creator */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center bg-gray-50 px-3 py-2 rounded-full">
          <Users className="w-4 h-4 mr-2 text-blue-500" />
          <span className="font-bold">{vault.members.length} members</span>
        </div>
        <div className="text-xs font-medium text-gray-500">
          by @{vault.creator}
        </div>
      </div>

      {/* Created Date */}
      <div className="mt-3 text-xs text-gray-400 text-center font-medium">
        Created {vault.createdAt.toLocaleDateString()}
      </div>
    </div>
  );
};

export default VaultCard;
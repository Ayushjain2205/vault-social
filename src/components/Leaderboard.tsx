import React, { useState } from 'react';
import { Trophy, Medal, Award, Users, TrendingUp } from 'lucide-react';
import { Vault } from '../types';
import { Vault as VaultIcon } from './Vault';

interface LeaderboardProps {
  vaults: Vault[];
  onSelectVault: (vault: Vault) => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ vaults, onSelectVault }) => {
  const [category, setCategory] = useState<'value' | 'members' | 'performance'>('value');

  const sortedVaults = [...vaults].sort((a, b) => {
    switch (category) {
      case 'value':
        return b.totalValue - a.totalValue;
      case 'members':
        return b.members.length - a.members.length;
      case 'performance':
        // Mock performance calculation
        return (b.totalValue * b.members.length) - (a.totalValue * a.members.length);
      default:
        return 0;
    }
  });

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 text-sm">{rank}</div>;
    }
  };

  const getCategoryValue = (vault: Vault) => {
    switch (category) {
      case 'value':
        return formatValue(vault.totalValue);
      case 'members':
        return `${vault.members.length} members`;
      case 'performance':
        return `${((vault.totalValue * vault.members.length) / 1000000).toFixed(1)}M score`;
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-playful font-bold text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text mb-4">
            🏆 Vault Leaderboard
          </h1>
          <p className="text-xl text-gray-600 font-friendly">
            See who's leading the pack in social trading!
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 border-2 border-gray-200 shadow-lg">
            <div className="flex space-x-2">
              {[
                { id: 'value', label: 'Total Value', emoji: '💰' },
                { id: 'members', label: 'Most Members', emoji: '👥' },
                { id: 'performance', label: 'Performance', emoji: '📈' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id as any)}
                  className={`px-4 py-2 rounded-xl font-bold text-base transition-all duration-200 ${
                    category === cat.id
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-3">
          {sortedVaults.map((vault, index) => {
            const rank = index + 1;
            const isTopThree = rank <= 3;
            
            return (
              <div
                key={vault.id}
                onClick={() => onSelectVault(vault)}
                className={`bg-white rounded-2xl p-4 border-2 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                  isTopThree 
                    ? 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="flex items-center justify-center w-12">
                      {getRankIcon(rank)}
                    </div>

                    {/* Vault Info */}
                    <div className="flex items-center space-x-3">
                      <VaultIcon seed={vault.id} size="xs" />
                      <div>
                        <h3 className="text-lg font-playful font-bold text-gray-800">
                          {vault.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
                            {vault.type}
                          </span>
                          <span className="text-gray-500 font-medium text-sm">
                            by @{vault.creator}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="text-xl font-playful font-bold text-gray-800 mb-1">
                      {getCategoryValue(vault)}
                    </div>
                    <div className="flex items-center text-gray-500 space-x-3 text-sm">
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        <span className="font-medium">{vault.members.length}</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        <span className="font-medium">{formatValue(vault.totalValue)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
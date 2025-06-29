import React, { useState } from 'react';
import { Vault } from '../types';
import VaultCard from './VaultCard';

interface ExplorePageProps {
  vaults: Vault[];
  onSelectVault: (vault: Vault) => void;
}

const ExplorePage: React.FC<ExplorePageProps> = ({ vaults, onSelectVault }) => {
  const [sortBy, setSortBy] = useState<'members' | 'recent' | 'value'>('value');
  const [filterType, setFilterType] = useState<'all' | 'Copy' | 'Group' | 'Time-Locked'>('all');

  const filteredVaults = vaults.filter(vault => 
    filterType === 'all' || vault.type === filterType
  );

  const sortedVaults = [...filteredVaults].sort((a, b) => {
    switch (sortBy) {
      case 'members':
        return b.members.length - a.members.length;
      case 'recent':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'value':
        return b.totalValue - a.totalValue;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl font-playful font-bold text-gray-800">
            Discover Vaults ✨
          </h1>
          
          <div className="flex items-center space-x-4">
            {/* Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-gray-700 font-friendly font-medium shadow-sm"
            >
              <option value="all">All Types 🔍</option>
              <option value="Copy">📋 Copy Vaults</option>
              <option value="Group">💎 Group Vaults</option>
              <option value="Time-Locked">⏰ Time-Locked</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-gray-700 font-friendly font-medium shadow-sm"
            >
              <option value="value">💰 Highest Value</option>
              <option value="members">👥 Most Members</option>
              <option value="recent">🆕 Recently Created</option>
            </select>
          </div>
        </div>

        {sortedVaults.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-gray-200 shadow-sm">
            <div className="text-8xl mb-6">🏦</div>
            <h3 className="text-3xl font-playful font-bold text-gray-600 mb-4">No Vaults Found</h3>
            <p className="text-gray-500 mb-8 text-xl font-friendly">Be the first to create a vault and start trading socially!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedVaults.map((vault) => (
              <VaultCard
                key={vault.id}
                vault={vault}
                onClick={() => onSelectVault(vault)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
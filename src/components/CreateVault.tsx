import React, { useState } from 'react';
import { ArrowLeft, Copy, Users, Clock } from 'lucide-react';
import { CreateVaultData, VaultType } from '../types';

interface CreateVaultProps {
  onBack: () => void;
  onCreateVault: (data: CreateVaultData) => void;
}

const CreateVault: React.FC<CreateVaultProps> = ({ onBack, onCreateVault }) => {
  const [formData, setFormData] = useState<CreateVaultData>({
    name: '',
    type: 'Copy',
    unlockDuration: 30,
  });

  const [selectedType, setSelectedType] = useState<VaultType>('Copy');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onCreateVault({
        ...formData,
        type: selectedType
      });
    }
  };

  const vaultTypes = [
    {
      type: 'Copy' as VaultType,
      icon: <Copy className="w-8 h-8" />,
      title: 'Copy Vault',
      description: 'Follow and copy successful traders automatically',
      emoji: '📋',
      color: 'from-blue-100 to-blue-200 border-blue-300'
    },
    {
      type: 'Group' as VaultType,
      icon: <Users className="w-8 h-8" />,
      title: 'Group Vault',
      description: 'Pool resources and share profits proportionally',
      emoji: '💎',
      color: 'from-purple-100 to-purple-200 border-purple-300'
    },
    {
      type: 'Time-Locked' as VaultType,
      icon: <Clock className="w-8 h-8" />,
      title: 'Time-Locked Vault',
      description: 'Lock funds for a specific duration',
      emoji: '⏰',
      color: 'from-orange-100 to-orange-200 border-orange-300'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="mr-6 p-3 rounded-2xl bg-white hover:bg-gray-50 transition-colors shadow-md border-2 border-gray-200"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-5xl font-playful font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
              Create New Vault 🏗️
            </h1>
            <p className="text-gray-600 mt-2 text-xl font-medium">
              Set up your trading vault and invite others to join the fun!
            </p>
          </div>
        </div>

        {/* Vault Type Selection */}
        <div className="mb-8">
          <h2 className="text-3xl font-playful font-bold mb-6 text-gray-800">Choose Your Vault Type ✨</h2>
          <div className="grid gap-6">
            {vaultTypes.map((vault) => (
              <div
                key={vault.type}
                onClick={() => setSelectedType(vault.type)}
                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-200 bg-gradient-to-r ${vault.color} ${
                  selectedType === vault.type
                    ? 'ring-4 ring-green-300 shadow-lg scale-105'
                    : 'hover:shadow-md hover:scale-102'
                }`}
              >
                <div className="flex items-start">
                  <div className="mr-6 text-5xl">
                    {vault.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-playful font-bold mb-2 text-gray-800">
                      {vault.title}
                    </h3>
                    <p className="text-gray-600 font-medium text-lg">
                      {vault.description}
                    </p>
                  </div>
                  <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all ${
                    selectedType === vault.type
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {selectedType === vault.type && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vault Details Form */}
        <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-lg">
          <h2 className="text-3xl font-playful font-bold mb-6 text-gray-800">Vault Details 📝</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xl font-bold text-gray-700 mb-3">
                Vault Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-0 transition-colors text-lg font-medium"
                placeholder="Enter a fun vault name..."
                required
              />
            </div>

            {selectedType === 'Time-Locked' && (
              <div>
                <label className="block text-xl font-bold text-gray-700 mb-3">
                  Lock Duration ⏱️
                </label>
                <select
                  value={formData.unlockDuration || 30}
                  onChange={(e) => setFormData(prev => ({ ...prev, unlockDuration: parseInt(e.target.value) }))}
                  className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-0 transition-colors text-lg font-medium"
                >
                  <option value={7}>1 Week</option>
                  <option value={30}>1 Month</option>
                  <option value={90}>3 Months</option>
                  <option value={180}>6 Months</option>
                  <option value={365}>1 Year</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-6 rounded-2xl font-bold text-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Create Vault 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateVault;
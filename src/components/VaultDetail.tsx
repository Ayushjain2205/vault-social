import React, { useState } from "react";
import { ArrowLeft, Users, Share, Wallet } from "lucide-react";
import { Vault } from "../types";
import { Vault as VaultIcon } from "./Vault";

interface VaultDetailProps {
  vault: Vault;
  onBack: () => void;
  onJoinVault: (vaultId: string, amount: number) => void;
}

const VaultDetail: React.FC<VaultDetailProps> = ({
  vault,
  onBack,
  onJoinVault,
}) => {
  const [joinAmount, setJoinAmount] = useState<string>("");
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectWallet = () => {
    setIsConnected(true);
  };

  const handleJoin = () => {
    const amount = parseFloat(joinAmount);
    if (amount > 0) {
      onJoinVault(vault.id, amount);
      setShowJoinModal(false);
      setJoinAmount("");
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/vault/${vault.id}`;
    navigator.clipboard.writeText(url);
  };

  const formatValue = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatTimeLeft = (timestamp?: number) => {
    if (!timestamp) return "";
    const now = Date.now();
    const diff = timestamp - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return days > 0
      ? `${days}d ${hours}h`
      : hours > 0
      ? `${hours}h`
      : "Unlocked";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-6 p-3 rounded-2xl bg-white hover:bg-gray-50 transition-colors shadow-md border-2 border-gray-200"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center">
              <VaultIcon seed={vault.id} size="sm" className="mr-6" />
              <div>
                <h1 className="text-5xl font-playful font-bold text-gray-800">
                  {vault.name}
                </h1>
                <p className="text-gray-600 text-xl font-medium">
                  by @{vault.creator}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="p-4 bg-white rounded-2xl hover:bg-gray-50 transition-colors shadow-md border-2 border-gray-200"
          >
            <Share className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vault Info Card */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-lg font-bold bg-blue-100 text-blue-700 border-2 border-blue-200">
                    {vault.type} Vault
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-lg font-bold bg-green-100 text-green-700 border-2 border-green-200">
                    ● Active
                  </span>
                </div>
                {vault.type === "Time-Locked" && vault.unlockTimestamp && (
                  <div className="text-center bg-orange-100 rounded-2xl p-4 border-2 border-orange-200">
                    <div className="text-sm text-orange-600 font-bold">
                      Unlocks In
                    </div>
                    <div className="text-2xl font-playful font-bold text-orange-600">
                      {formatTimeLeft(vault.unlockTimestamp)}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl border-2 border-green-200">
                  <div className="text-4xl font-playful font-bold text-green-800">
                    {formatValue(vault.totalValue)}
                  </div>
                  <div className="text-green-600 font-bold">Total Value</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl border-2 border-blue-200">
                  <div className="text-4xl font-playful font-bold text-blue-800">
                    {vault.members.length}
                  </div>
                  <div className="text-blue-600 font-bold">Members</div>
                </div>
              </div>
            </div>

            {/* Members List */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-lg">
              <h2 className="text-3xl font-playful font-bold mb-6 flex items-center text-gray-800">
                <Users className="w-8 h-8 mr-3 text-blue-500" />
                Members ({vault.members.length}) 👥
              </h2>
              <div className="space-y-4">
                {vault.members.map((member, index) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border-2 border-gray-200"
                  >
                    <div>
                      <div className="font-bold text-lg text-gray-800">
                        {member.nickname}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        {member.address.slice(0, 8)}...
                        {member.address.slice(-8)}
                      </div>
                      <div className="text-sm text-gray-400">
                        Joined {member.joinedAt.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-800">
                        ₿{member.contribution.toFixed(3)}
                      </div>
                      {vault.type === "Group" && member.sharePercentage && (
                        <div className="text-sm text-purple-600 font-bold">
                          {member.sharePercentage}% share
                        </div>
                      )}
                      {vault.type === "Copy" && (
                        <div
                          className={`text-sm font-bold ${
                            member.isFollowing
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          {member.isFollowing
                            ? "✓ Following"
                            : "✗ Not following"}
                        </div>
                      )}
                      {index === 0 && (
                        <div className="text-sm text-yellow-600 font-bold">
                          👑 Creator
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Vault Card */}
            <div className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-lg">
              <h3 className="text-2xl font-playful font-bold mb-4 text-gray-800">
                Join This Vault 🚀
              </h3>

              {!isConnected ? (
                <button
                  onClick={handleConnectWallet}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 px-4 rounded-2xl font-bold text-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <Wallet className="w-6 h-6 mr-2" />
                  Connect Wallet
                </button>
              ) : (
                <button
                  onClick={() => setShowJoinModal(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Join Vault
                </button>
              )}

              <div className="mt-4 text-center text-sm">
                <div className="flex items-center justify-center text-green-600 font-bold">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Vault is Active
                </div>
              </div>
            </div>

            {/* Vault Stats */}
            <div className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-lg">
              <h3 className="text-2xl font-playful font-bold mb-4 text-gray-800">
                Vault Stats 📊
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600 font-medium">Created</span>
                  <span className="font-bold text-gray-800">
                    {vault.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600 font-medium">Type</span>
                  <span className="font-bold text-gray-800">{vault.type}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600 font-medium">
                    Avg Contribution
                  </span>
                  <span className="font-bold text-gray-800">
                    ₿
                    {(
                      vault.totalValue /
                      Math.max(vault.members.length, 1) /
                      50000
                    ).toFixed(3)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border-2 border-gray-200 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-playful font-bold mb-2 text-gray-800">
                Join {vault.name}
              </h3>
              <p className="text-gray-600 font-medium text-lg">
                Enter your contribution amount:
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-xl font-bold text-gray-700 mb-3">
                Amount (BTC)
              </label>
              <input
                type="number"
                step="0.001"
                value={joinAmount}
                onChange={(e) => setJoinAmount(e.target.value)}
                className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-colors text-lg font-medium"
                placeholder="0.000"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowJoinModal(false)}
                className="flex-1 py-4 px-4 border-2 border-gray-300 text-gray-600 rounded-2xl hover:border-gray-400 transition-colors font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleJoin}
                disabled={!joinAmount || parseFloat(joinAmount) <= 0}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-4 rounded-2xl font-bold transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
              >
                Join Vault
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaultDetail;

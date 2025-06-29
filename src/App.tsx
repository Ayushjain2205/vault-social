import { useState } from "react";
import LandingPage from "./components/LandingPage";
import ExplorePage from "./components/ExplorePage";
import CreateVault from "./components/CreateVault";
import VaultDetail from "./components/VaultDetail";
import Leaderboard from "./components/Leaderboard";
import Navbar from "./components/Navbar";
import { Vault, CreateVaultData, Member } from "./types";
import { mockVaults, generateVaultId } from "./utils/mockData";

type AppView = "landing" | "explore" | "leaderboard" | "create" | "detail";

function App() {
  const [currentView, setCurrentView] = useState<AppView>("landing");
  const [vaults, setVaults] = useState<Vault[]>(mockVaults);
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null);

  const handleCreateVault = (data: CreateVaultData) => {
    const newVault: Vault = {
      id: generateVaultId(),
      name: data.name,
      type: data.type,
      creator: "You",
      createdAt: new Date(),
      members: [],
      totalValue: 0,
      isActive: true,
      unlockTimestamp: data.unlockDuration
        ? Date.now() + data.unlockDuration * 24 * 60 * 60 * 1000
        : undefined,
    };

    setVaults((prev) => [newVault, ...prev]);
    setCurrentView("explore");
  };

  const handleJoinVault = (vaultId: string, amount: number) => {
    const nicknames = [
      "CryptoNinja",
      "MoonRider",
      "WhaleWatcher",
      "DiamondHands",
      "TreasureHunter",
      "RocketMan",
      "GoldDigger",
    ];

    const newMember: Member = {
      id: generateVaultId(),
      address: "bc1quser" + Math.random().toString(36).substr(2, 12),
      joinedAt: new Date(),
      contribution: amount,
      sharePercentage: Math.floor(Math.random() * 40) + 10,
      isFollowing: Math.random() > 0.5,
      nickname: nicknames[Math.floor(Math.random() * nicknames.length)],
    };

    setVaults((prev) =>
      prev.map((vault) => {
        if (vault.id === vaultId) {
          const updatedVault = {
            ...vault,
            members: [...vault.members, newMember],
            totalValue: vault.totalValue + amount * 50000, // Convert BTC to USD for display
          };

          if (selectedVault?.id === vaultId) {
            setSelectedVault(updatedVault);
          }

          return updatedVault;
        }
        return vault;
      })
    );
  };

  const handleSelectVault = (vault: Vault) => {
    setSelectedVault(vault);
    setCurrentView("detail");
  };

  const handleGetStarted = () => {
    setCurrentView("explore");
  };

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage onGetStarted={handleGetStarted} />;

      case "create":
        return (
          <CreateVault
            onBack={() => setCurrentView("explore")}
            onCreateVault={handleCreateVault}
          />
        );

      case "detail":
        return selectedVault ? (
          <VaultDetail
            vault={selectedVault}
            onBack={() => setCurrentView("explore")}
            onJoinVault={handleJoinVault}
          />
        ) : null;

      case "leaderboard":
        return (
          <Leaderboard vaults={vaults} onSelectVault={handleSelectVault} />
        );

      case "explore":
        return (
          <ExplorePage vaults={vaults} onSelectVault={handleSelectVault} />
        );

      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="App font-friendly">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      {renderCurrentView()}
    </div>
  );
}

export default App;

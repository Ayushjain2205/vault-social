import React, { useState, useEffect } from "react";
import { Compass, Trophy, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { Vault } from "./Vault";
import { ConnectButton } from "thirdweb/react";
import { client, citreaDevnet } from "../client";

type AppView = "landing" | "explore" | "leaderboard" | "create" | "detail";

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [logoSeed, setLogoSeed] = useState("");
  const [bitcoinPrice, setBitcoinPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Generate a random seed on component mount (page reload)
    setLogoSeed(Math.random().toString(36).substring(2, 15));

    // Fetch Bitcoin price immediately and then every 30 seconds
    fetchBitcoinPrice();
    const interval = setInterval(fetchBitcoinPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchBitcoinPrice = async () => {
    try {
      setError(false);
      // Using CoinGecko API which supports CORS
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch price");
      }

      const data = await response.json();
      const newPrice = data.bitcoin.usd;
      const change24h = data.bitcoin.usd_24h_change || 0;

      // Calculate price change based on 24h change percentage
      const changeAmount = (newPrice * change24h) / 100;

      setBitcoinPrice(newPrice);
      setPriceChange(changeAmount);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching Bitcoin price:", err);
      setError(true);

      // Use fallback price for demo if this is the first load
      if (bitcoinPrice === 0) {
        setBitcoinPrice(67234.56);
        setPriceChange(1234.56);
      }
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatPriceChange = (change: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(change));
  };

  const navItems = [
    {
      id: "explore" as AppView,
      label: "Explore",
      icon: <Compass className="w-5 h-5" />,
      emoji: "🔍",
    },
    {
      id: "leaderboard" as AppView,
      label: "Leaderboard",
      icon: <Trophy className="w-5 h-5" />,
      emoji: "🏆",
    },
  ];

  return (
    <nav className="bg-white border-b-4 border-blue-200 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Clickable */}
          <div
            className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={() => onNavigate("landing")}
          >
            {logoSeed && <Vault seed={logoSeed} size="logo" />}
            <div className="text-4xl font-playful font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Vault Social
            </div>
          </div>

          {/* Right - Navigation and Connect Button */}
          <div className="flex items-center space-x-6">
            <div className="flex space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center px-4 py-2 rounded-2xl font-bold text-lg transition-colors duration-200
                    ${
                      currentView === item.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-blue-50"
                    }
                  `}
                >
                  <span className="mr-2">{item.emoji}</span>
                  {item.label}
                </button>
              ))}
              {/* Create Vault Button */}
              <button
                onClick={() => onNavigate("create")}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-2xl font-bold text-lg flex items-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 ml-2"
              >
                <Plus className="w-5 h-5 mr-2" />
                <span className="mr-1">Create Vault</span>
                <span className="text-xl">🚀</span>
              </button>
            </div>
            {/* Connect Wallet Button */}
            <ConnectButton client={client} chain={citreaDevnet} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

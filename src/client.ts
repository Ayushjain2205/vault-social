import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export const citreaDevnet = defineChain({
  id: 5115,
  name: "Citrea Testnet",
  rpc: "https://rpc.testnet.citrea.xyz",
  nativeCurrency: {
    name: "Citrea",
    symbol: "CTREA",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "Citrea Explorer",
      url: "https://explorer.testnet.citrea.xyz",
    },
  ],
  testnet: true,
});

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});

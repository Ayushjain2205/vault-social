import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThirdwebProvider } from "thirdweb/react";
// import { client } from "./client"; // No longer needed for provider

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThirdwebProvider>
      <App />
    </ThirdwebProvider>
  </StrictMode>
);

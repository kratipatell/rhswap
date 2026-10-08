"use client";

import { useMemo } from "react";
import { LiFiWidget, type WidgetConfig } from "@lifi/widget";
import { EthereumProvider } from "@lifi/widget-provider-ethereum";

// Robinhood Chain — Arbitrum Orbit L2, native gas token ETH.
const ROBINHOOD_CHAIN_ID = 4663;
const ETHEREUM_CHAIN_ID = 1;
// Native ETH placeholder address used by LI.FI for the native gas token.
const NATIVE_ETH = "0x0000000000000000000000000000000000000000";

export default function SwapWidget() {
  const integrator = process.env.NEXT_PUBLIC_INTEGRATOR || "rhswap";

  const config = useMemo<WidgetConfig>(() => {
    const walletConnectProjectId =
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || undefined;
    const apiKey = process.env.NEXT_PUBLIC_LIFI_API_KEY || undefined;

    return {
      // Required in v4 — also passed as the LiFiWidget prop below.
      integrator,
      // Default (unified) mode keeps From and To chain selection fully
      // independent (Jumper-style). Do NOT use mode: "split" here: with no
      // modeOptions it defaults to the Swap tab, which forces toChain to
      // follow fromChain and hides the To chain selector.
      // Wide variant shows the route list in a second panel to the right
      // on desktop; below the 852px breakpoint the widget falls back to
      // the compact single-column layout automatically (useWideVariant).
      variant: "wide",
      appearance: "dark",
      // Rename the main heading from "Exchange" to "Swap & Bridge".
      // MainPage renders t('header.exchange') in default mode; the
      // existing header.swapAndBridge key already holds "Swap & Bridge".
      languageResources: {
        en: {
          header: {
            exchange: "Swap & Bridge",
          },
        },
      },
      // Defaults: ETH on Ethereum -> ETH on Robinhood Chain.
      // Independent: setting both up front never links the two fields.
      fromChain: ETHEREUM_CHAIN_ID,
      fromToken: NATIVE_ETH,
      toToken: NATIVE_ETH,
      // Pre-select Robinhood Chain as the destination.
      toChain: ROBINHOOD_CHAIN_ID,
      ...(apiKey ? { apiKey } : {}),
      // Built-in wallet management (injected + WalletConnect + Coinbase).
      // No external WagmiProvider needed — the widget manages connections itself.
      providers: [
        EthereumProvider(
          walletConnectProjectId
            ? {
                walletConnect: { projectId: walletConnectProjectId },
                coinbase: true,
              }
            : undefined,
        ),
      ],
      sdkConfig: {
        // Public RPC is rate limited — LI.FI falls back to its own defaults
        // when this endpoint throttles.
        rpcUrls: {
          [ROBINHOOD_CHAIN_ID]: ["https://rpc.mainnet.chain.robinhood.com"],
        },
      },
      explorerUrls: {
        [ROBINHOOD_CHAIN_ID]: ["https://robinhoodchain.blockscout.com"],
      },
      // Appearance is locked to dark to match the page; hide the toggle.
      hiddenUI: { appearance: true },
      theme: {
        colorSchemes: {
          dark: {
            palette: {
              primary: { main: "#CCFF00" },
              secondary: { main: "#CCFF00" },
              background: { default: "#0A0A0A", paper: "#161616" },
              text: { primary: "#F4F4F5", secondary: "#A1A1AA" },
              grey: {
                200: "#27272A",
                300: "#3F3F46",
                700: "#52525B",
                800: "#27272A",
              },
            },
          },
        },
        shape: {
          borderRadius: 16,
          borderRadiusSecondary: 12,
          borderRadiusTertiary: 20,
        },
        typography: {
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        },
        container: {
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
        },
      },
    };
  }, [integrator]);

  return <LiFiWidget integrator={integrator} config={config} />;
}

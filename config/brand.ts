/**
 * Brand configuration for rhswap (rhswap.xyz).
 *
 * Single source of truth for display strings, colors, domain, and the
 * default widget chains/tokens so the site can be rebranded later.
 *
 * NOTE: No hostname switching is implemented — this file is config only.
 * The LI.FI widget config in `components/SwapWidget.tsx` intentionally
 * keeps its own values for now; keep them in sync by hand when rebranding.
 */
export const brand = {
  name: "RHSWAP",
  tagline: "Swap & bridge to Robinhood Chain",
  description:
    "Swap and bridge tokens to Robinhood Chain (chain ID 4663) with best-price routing powered by LI.FI.",
  domain: "rhswap.xyz",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://rhswap.xyz",
  colors: {
    /** Lime accent */
    volt: "#CCFF00",
    voltDim: "#A8D400",
    /** Near-black page background */
    void: "#0A0A0A",
    panel: "#131313",
    panel2: "#1A1A1A",
  },
  chains: {
    ethereum: 1,
    robinhood: 4663,
  },
  /** Native ETH placeholder address used by LI.FI for the native gas token. */
  nativeEth: "0x0000000000000000000000000000000000000000",
  defaults: {
    fromChainId: 1,
    fromToken: "0x0000000000000000000000000000000000000000",
    toChainId: 4663,
    toToken: "0x0000000000000000000000000000000000000000",
  },
  integrator: process.env.NEXT_PUBLIC_INTEGRATOR || "rhswap",
  explorerUrls: {
    4663: ["https://robinhoodchain.blockscout.com"],
  } as Record<number, string[]>,
  rpcUrls: {
    4663: ["https://rpc.mainnet.chain.robinhood.com"],
  } as Record<number, string[]>,
} as const;

export type Brand = typeof brand;

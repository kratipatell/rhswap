import Link from "next/link";
import SwapWidgetLoader from "@/components/SwapWidgetLoader";

const NAV = [
  { label: "Trade", href: "/", active: true, soon: false },
  { label: "Earn", href: "#", active: false, soon: true },
  { label: "Portfolio", href: "#", active: false, soon: true },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/5 bg-void/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="inline-block h-5 w-5 rounded-[6px] bg-volt shadow-[0_0_16px_rgba(204,255,0,0.5)]"
            />
            <span className="text-[17px] font-extrabold tracking-[0.18em] text-white">
              RHSWAP
            </span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            {NAV.map((item) =>
              item.active ? (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current="page"
                  className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  key={item.label}
                  aria-disabled
                  title="Coming soon"
                  className="flex cursor-not-allowed items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium text-zinc-500"
                >
                  {item.label}
                  <span className="rounded-full border border-white/10 px-1.5 py-px text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Soon
                  </span>
                </span>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-400 sm:flex">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-volt" />
            Robinhood Chain · 4663
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-volt">
          Powered by LI.FI
        </p>
        <h1 className="max-w-2xl text-balance text-center text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-[42px] sm:leading-[1.1]">
          Swap &amp; bridge to{" "}
          <span className="whitespace-nowrap">Robinhood Chain</span>
        </h1>
        <p className="mt-4 max-w-md text-center text-[15px] leading-relaxed text-zinc-400">
          Best-price routing across bridges and DEXs, straight into chain ID
          4663. Connect a wallet to begin.
        </p>

        <div className="widget-glow mt-10 flex w-full max-w-[1080px] justify-center">
          {/* Compact single column on mobile (widget is 420px); full
              two-panel width once the widget passes its 852px breakpoint:
              600px form + 24px gap + 436px routes panel. */}
          <div className="w-full max-w-[420px] md:max-w-[1060px]">
            <SwapWidgetLoader />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-4 py-6 text-center sm:px-6">
          <p className="text-xs text-zinc-500">
            Independent interface. Not affiliated with or endorsed by Robinhood.
          </p>
          <p className="text-xs text-zinc-600">
            Routing by LI.FI · Always verify transaction details in your wallet
          </p>
        </div>
      </footer>
    </div>
  );
}

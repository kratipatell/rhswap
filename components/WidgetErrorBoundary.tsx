"use client";

import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

/**
 * Catches render/runtime failures inside the LI.FI widget (failed chunk
 * load, wallet provider crash, etc.) and shows a friendly retry message
 * in the same visual style instead of a blank card or a root error page.
 */
export default class WidgetErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Surface the failure for debugging without leaking details to the UI.
    console.error("[SwapWidget] failed to render:", error);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex w-full flex-col items-center rounded-[20px] border border-white/10 bg-panel px-6 py-12 text-center"
        >
          <span
            aria-hidden
            className="inline-block h-8 w-8 rounded-[10px] bg-volt shadow-[0_0_24px_rgba(204,255,0,0.4)]"
          />
          <h2 className="mt-5 text-lg font-bold text-white">
            Swap widget couldn&apos;t load
          </h2>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-400">
            Check your connection and try again. Your wallet and funds are
            unaffected — the widget simply failed to start.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="mt-6 rounded-full bg-volt px-6 py-2 text-sm font-bold text-black transition hover:brightness-110"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

"use client";

import dynamic from "next/dynamic";
import { WidgetSkeleton } from "@lifi/widget";
import WidgetErrorBoundary from "@/components/WidgetErrorBoundary";

// The widget touches browser wallet APIs and is not SSR-safe, so it stays
// behind a client-only dynamic boundary with a skeleton placeholder.
// Any render/runtime failure inside the widget is caught by
// WidgetErrorBoundary, which shows a friendly retry message.
const SwapWidget = dynamic(() => import("@/components/SwapWidget"), {
  ssr: false,
  loading: () => (
    <WidgetSkeleton
      config={{
        theme: {
          container: {
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
          },
        },
      }}
    />
  ),
});

export default function SwapWidgetLoader() {
  return (
    <WidgetErrorBoundary>
      <SwapWidget />
    </WidgetErrorBoundary>
  );
}

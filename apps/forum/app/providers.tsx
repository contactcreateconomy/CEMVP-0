"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";
import { useMemo } from "react";

// Singleton pattern to prevent multiple Convex client instances
let convexClient: ConvexReactClient | null = null;

function getConvexClient(): ConvexReactClient | null {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return null;

  if (!convexClient) {
    convexClient = new ConvexReactClient(url);
  }
  return convexClient;
}

export function Providers({ children }: { children: ReactNode }) {
  const convex = useMemo(() => getConvexClient(), []);

  if (!convex) {
    return <>{children}</>;
  }
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

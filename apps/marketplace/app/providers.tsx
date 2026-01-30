"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";
import { useMemo, useEffect, useRef } from "react";

// Singleton pattern to prevent multiple Convex client instances
let convexClient: ConvexReactClient | null = null;

function getConvexClient(): ConvexReactClient | null {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return null;

  if (!convexClient) {
    convexClient = new ConvexReactClient(url, {
      // Enable caching to reduce memory pressure
      cachedLocations: {
        // Cache in IndexedDB for persistence
        IndexedDB: {
          indexedDB: typeof window !== "undefined" ? window.indexedDB : undefined,
          dbName: "convex-cache",
          maxAgeInSeconds: 300,
        },
      },
    });
  }
  return convexClient;
}

export function Providers({ children }: { children: ReactNode }) {
  const convex = useMemo(() => getConvexClient(), []);
  const cleanupRef = useRef(false);

  useEffect(() => {
    // Cleanup on unmount only in development to prevent memory leaks during HMR
    if (process.env.NODE_ENV === "development" && !cleanupRef.current) {
      cleanupRef.current = true;
      return () => {
        // Note: We don't close the client here as it's a singleton
        // The cleanup is handled by the browser when the tab is closed
      };
    }
  }, []);

  if (!convex) {
    return <>{children}</>;
  }
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

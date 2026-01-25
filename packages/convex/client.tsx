/**
 * Shared Convex client configuration
 *
 * This file exports the Convex client setup that can be used by all apps.
 * Each app should wrap its root with the ConvexProvider and configure
 * the deployment URL based on their environment.
 */

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { type ReactNode } from "react";

/**
 * Create a Convex client instance
 * @param deploymentUrl - The Convex deployment URL
 * @returns ConvexReactClient instance
 */
export function createConvexClient(deploymentUrl?: string) {
  return new ConvexReactClient(
    deploymentUrl || process.env.NEXT_PUBLIC_CONVEX_URL!
  );
}

/**
 * Props for the ConvexAppProvider component
 */
interface ConvexAppProviderProps {
  children: ReactNode;
  deploymentUrl?: string;
}

/**
 * Convex provider component that can be used in app layouts
 *
 * Usage:
 * ```tsx
 * import { ConvexAppProvider } from "@createconomy/convex/client";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <ConvexAppProvider>
 *       {children}
 *     </ConvexAppProvider>
 *   );
 * }
 * ```
 */
export function ConvexAppProvider({
  children,
  deploymentUrl,
}: ConvexAppProviderProps) {
  const client = createConvexClient(deploymentUrl);
  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}

// Re-export Convex utilities for convenience
export { useQuery, useMutation, useAction } from "convex/react";

// Re-export API types
export type { DataModel } from "./_generated/server";

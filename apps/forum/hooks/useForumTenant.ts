import { useQuery } from "convex/react";
import { api } from "@createconomy/convex/client";
import { useMemo } from "react";

/**
 * Hook to get the forum tenant ID from Convex
 * Caches the tenant ID to avoid repeated queries
 */
export function useForumTenant() {
  const tenant = useQuery(
    // @ts-expect-error - api object pattern causes type mismatch, runtime works correctly
    api.tenants.getTenantBySlug,
    { slug: "forum" }
  );

  const tenantId = useMemo(() => {
    return tenant?._id;
  }, [tenant]);

  return {
    tenantId,
    tenant,
    isLoading: tenant === undefined,
  };
}

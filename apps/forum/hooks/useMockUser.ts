import { useMemo } from "react";

// Type alias for Id to avoid import issues
type Id<TableName extends string> = string & { __tableName: TableName };

/**
 * Mock user hook for development
 * Returns a mock user ID for testing like/bookmark functionality
 * Uses a real user ID from the seeded database
 * TODO: Replace with real authentication context when implemented
 */
export function useMockUser() {
  // Use Sarah's user ID from the seeded database
  const mockUserId = useMemo<Id<"users">>(() => {
    // This is a real user ID from the database (Sarah Chen)
    return "ks7av31fqs0zdw4x1j7er035917zynyw" as Id<"users">;
  }, []);

  const mockUser = useMemo(
    () => ({
      _id: mockUserId,
      name: "Sarah Chen",
      username: "sarahchen",
      email: "sarah.chen@example.com",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      role: "customer" as const,
      bio: "Full-stack developer passionate about React and TypeScript",
      tenantId: "j576qq9y801m8vy722n94ncems7zyh8e" as Id<"tenants">,
    }),
    [mockUserId]
  );

  return {
    user: mockUser,
    userId: mockUserId,
    isAuthenticated: true,
    isLoading: false,
  };
}

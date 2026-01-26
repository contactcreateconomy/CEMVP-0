import { useMutation, useQuery } from "convex/react";
import { api } from "./_generated/server";
import type { Id } from "./convex/_generated/dataModel";

/**
 * Auth response type
 */
export interface AuthResult {
  success: boolean;
  userId?: Id<"users">;
  sessionId?: Id<"sessions">;
  user?: {
    id: Id<"users">;
    name: string;
    email: string;
    role: string;
    image?: string;
  };
  error?: string;
}

/**
 * Get current session from storage
 * @returns Session data if available, null otherwise
 */
export function getCurrentSession(): {
  sessionId: string;
  userId: string;
} | null {
  if (typeof window === "undefined") {
    return null;
  }

  const sessionId = localStorage.getItem("sessionId");
  const userId = localStorage.getItem("userId");

  if (!sessionId || !userId) {
    return null;
  }

  return { sessionId, userId };
}

/**
 * Get current user session from Convex
 * Note: This hook is designed to work with auth functions
 */
export function useSession() {
  const localSession = getCurrentSession();

  // Use "skip" trick to conditionally skip the query
  const sessionId = localSession?.sessionId as Id<"sessions"> | undefined;

  // Use type assertion since we know auth module exists
  const getSession = (api as any).auth?.getSession;
  if (!getSession) {
    return undefined;
  }

  return useQuery(getSession, sessionId ? { sessionId } : "skip");
}

/**
 * Sign in hook
 * Handles user sign in with email and password
 */
export function useSignIn() {
  // Use type assertion since we know auth module exists
  const signIn = useMutation((api as any).auth.signIn);

  return async (
    tenantDomain: string,
    credentials: { email: string; password: string }
  ): Promise<AuthResult> => {
    try {
      const result = await signIn({
        email: credentials.email,
        password: credentials.password,
        tenantDomain,
      });

      // Store session in localStorage for persistence
      if (result.sessionId && result.userId) {
        localStorage.setItem("sessionId", result.sessionId);
        localStorage.setItem("userId", result.userId);
      }

      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Sign in failed",
      };
    }
  };
}

/**
 * Sign up hook
 * Handles new user registration
 */
export function useSignUp() {
  // Use type assertion since we know auth module exists
  const signUp = useMutation((api as any).auth.signUp);

  return async (
    tenantDomain: string,
    data: { name: string; email: string; password: string }
  ): Promise<AuthResult> => {
    try {
      const result = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        tenantDomain,
      });

      // Store session in localStorage for persistence
      if (result.sessionId && result.userId) {
        localStorage.setItem("sessionId", result.sessionId);
        localStorage.setItem("userId", result.userId);
      }

      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Sign up failed",
      };
    }
  };
}

/**
 * Sign out hook
 * Clears session from storage and Convex
 */
export function useSignOut() {
  // Use type assertion since we know auth module exists
  const signOut = useMutation((api as any).auth.signOut);

  return async (): Promise<void> => {
    const localSession = getCurrentSession();

    if (localSession) {
      try {
        await signOut({ sessionId: localSession.sessionId as Id<"sessions"> });
      } catch (error) {
        // Continue with cleanup even if Convex call fails
        console.error("Sign out error:", error);
      }
    }

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("sessionId");
      localStorage.removeItem("userId");
    }
  };
}

/**
 * Check if user is authenticated
 */
export function useIsAuthenticated(): boolean {
  const session = useSession();
  return !!session;
}

/**
 * Get current user from session
 */
export function useCurrentUser() {
  const session = useSession();
  return session?.user || null;
}

/**
 * Clear session (client-side only)
 * Use this for immediate UI updates without waiting for Convex
 */
export function clearSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("sessionId");
    localStorage.removeItem("userId");
  }
}

/**
 * Set session (for testing purposes)
 * @param sessionId - Session ID
 * @param userId - User ID
 */
export function setSession(sessionId: string, userId: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("sessionId", sessionId);
    localStorage.setItem("userId", userId);
  }
}

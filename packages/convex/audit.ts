/**
 * Audit Logging Utilities for Convex
 *
 * Provides audit logging functionality for tracking sensitive operations
 * such as admin actions, data modifications, and security-relevant events.
 */

import { MutationCtx } from "./_generated/functions";
import { Id } from "./_generated/dataModel";

/**
 * Audit log entry types
 */
export type AuditEventType =
  | "user.created"
  | "user.updated"
  | "user.deleted"
  | "user.role_changed"
  | "tenant.created"
  | "tenant.updated"
  | "product.created"
  | "product.updated"
  | "product.deleted"
  | "order.created"
  | "order.status_updated"
  | "order.cancelled"
  | "order.refunded"
  | "forum.post.created"
  | "forum.post.updated"
  | "forum.post.deleted"
  | "forum.post.pinned"
  | "forum.post.locked"
  | "forum.comment.created"
  | "forum.comment.updated"
  | "forum.comment.deleted"
  | "admin.login"
  | "admin.failed_action"
  | "admin.data_export"
  | "admin.settings_changed"
  | "security.suspicious_activity"
  | "security.auth_failure";

/**
 * Audit log entry structure
 */
export interface AuditLog {
  id: string;
  eventType: AuditEventType;
  userId: Id<"users"> | null;
  tenantId: Id<"tenants"> | null;
  resourceId: Id<"users"> | Id<"products"> | Id<"orders"> | Id<"forumPosts"> | Id<"forumComments"> | Id<"tenants"> | null;
  resourceType: "user" | "tenant" | "product" | "order" | "post" | "comment" | null;
  action: "create" | "update" | "delete" | "read" | "export" | "login" | "logout" | "failed";
  ipAddress: string | null;
  userAgent: string | null;
  timestamp: number;
  details: Record<string, unknown>;
  status: "success" | "failure";
}

/**
 * Log an audit event
 *
 * @param ctx - Convex mutation context
 * @param eventType - The type of audit event
 * @param details - Additional details about the event
 * @param resourceId - The ID of the affected resource (optional)
 * @param resourceType - The type of resource (optional)
 * @returns The audit log ID
 */
export async function logAuditEvent(
  ctx: MutationCtx,
  eventType: AuditEventType,
  details: Record<string, unknown> = {},
  resourceId?: Id<"users"> | Id<"products"> | Id<"orders"> | Id<"forumPosts"> | Id<"forumComments"> | Id<"tenants">,
  resourceType?: "user" | "tenant" | "product" | "order" | "post" | "comment"
): Promise<string> {
  // Get current user identity if available
  const identity = await ctx.auth.getUserIdentity();
  const userId = identity?.subject
    ? (identity.subject as Id<"users">)
    : null;

  // Get tenant from user context if available
  let tenantId: Id<"tenants"> | null = null;
  if (userId) {
    const user = await ctx.db.get(userId);
    tenantId = user?.tenantId || null;
  }

  // Extract IP and user agent from request context if available
  const ipAddress = (ctx as any).request?.ip || null;
  const userAgent = (ctx as any).request?.userAgent || null;

  // Generate audit log ID
  const auditId = crypto.randomUUID();

  // Create audit log entry
  const auditLog: Omit<AuditLog, "id"> = {
    eventType,
    userId,
    tenantId,
    resourceId: resourceId || null,
    resourceType: resourceType || null,
    action: getActionFromEventType(eventType),
    ipAddress,
    userAgent,
    timestamp: ctx.db.systemTime(),
    details: {
      ...details,
      auditId,
    },
    status: "success",
  };

  // In a real implementation, this would be stored in an audit logs table
  // For now, we'll log to console (which should be replaced with proper audit logging)
  if (process.env.NODE_ENV === "production") {
    // In production, send to external audit logging service
    // e.g., Sentry, DataDog, LogRocket, or custom audit log table
    console.log("[AUDIT]", JSON.stringify(auditLog));
  } else {
    // In development, log detailed info
    console.log(`[AUDIT] ${eventType}`, auditLog);
  }

  return auditId;
}

/**
 * Get the action type from an event type
 */
function getActionFromEventType(eventType: AuditEventType): "create" | "update" | "delete" | "read" | "export" | "login" | "logout" | "failed" {
  if (eventType.includes("created")) return "create";
  if (eventType.includes("updated") || eventType.includes("changed")) return "update";
  if (eventType.includes("deleted")) return "delete";
  if (eventType.includes("login")) return "login";
  if (eventType.includes("logout")) return "logout";
  if (eventType.includes("failed")) return "failed";
  if (eventType.includes("export")) return "export";
  return "read";
}

/**
 * Audit wrapper for mutations that automatically logs audit events
 *
 * @param mutationName - Name of the mutation for logging
 * @returns A wrapper function that can be used around mutation handlers
 */
export function withAuditLogging<T extends Record<string, unknown>>(
  eventType: AuditEventType,
  resourceType?: "user" | "tenant" | "product" | "order" | "post" | "comment"
) {
  return function (
    target: (ctx: MutationCtx, args: T) => Promise<unknown>
  ) {
    return async (ctx: MutationCtx, args: T) => {
      try {
        const result = await target(ctx, args);

        // Log the successful action
        await logAuditEvent(ctx, eventType, args as Record<string, unknown>, args.id as any, resourceType);

        return result;
      } catch (error) {
        // Log the failed action
        await logAuditEvent(
          ctx,
          `${eventType}.failed` as AuditEventType,
          {
            error: error instanceof Error ? error.message : "Unknown error",
          },
          args.id as any,
          resourceType
        );

        throw error;
      }
    };
  };
}

/**
 * Log admin-specific actions with enhanced tracking
 */
export async function logAdminAction(
  ctx: MutationCtx,
  action: string,
  details: Record<string, unknown> = {}
): Promise<string> {
  return await logAuditEvent(ctx, `admin.${action}` as AuditEventType, details);
}

/**
 * Log security events for monitoring
 */
export async function logSecurityEvent(
  ctx: MutationCtx,
  eventType: "security.suspicious_activity" | "security.auth_failure",
  details: Record<string, unknown> = {}
): Promise<string> {
  return await logAuditEvent(ctx, eventType, details);
}

/**
 * Helper function to log data access (for compliance)
 */
export async function logDataAccess(
  ctx: MutationCtx,
  dataType: "users" | "orders" | "products" | "all",
  details: Record<string, unknown> = {}
): Promise<string> {
  return await logAuditEvent(
    ctx,
    `admin.data_export` as AuditEventType,
    {
      ...details,
      dataType,
      accessedAt: ctx.db.systemTime(),
    }
  );
}

/**
 * Check if an action should be audited based on its sensitivity
 */
export function requiresAudit(action: string): boolean {
  const auditableActions = [
    "createUser",
    "deleteUser",
    "updateUser",
    "deleteUser",
    "createTenant",
    "updateTenant",
    "deleteProduct",
    "updateOrderStatus",
    "deleteForumPost",
    "pinPost",
    "lockPost",
    "deleteComment",
    "getStats",
    "getUsers",
  ];

  return auditableActions.some((a) => action.includes(a));
}

/**
 * Audit log retention periods (in days)
 */
export const AUDIT_RETENTION_DAYS = {
  CRITICAL: 2555, // 7 years for compliance
  HIGH: 1095, // 3 years
  MEDIUM: 365, // 1 year
  LOW: 90, // 3 months
};

/**
 * Determine retention period based on event type
 */
export function getRetentionDays(eventType: AuditEventType): number {
  if (
    eventType.includes("admin") ||
    eventType.includes("security") ||
    eventType.includes("deleted")
  ) {
    return AUDIT_RETENTION_DAYS.CRITICAL;
  }

  if (
    eventType.includes("role_changed") ||
    eventType.includes("updated") ||
    eventType.includes("cancelled")
  ) {
    return AUDIT_RETENTION_DAYS.HIGH;
  }

  if (eventType.includes("created")) {
    return AUDIT_RETENTION_DAYS.MEDIUM;
  }

  return AUDIT_RETENTION_DAYS.LOW;
}

/**
 * Get audit logs for a specific time range (for admin queries)
 * NOTE: This is a placeholder - implement based on your audit storage
 */
export async function getAuditLogs(
  ctx: MutationCtx,
  filters: {
    startDate?: number;
    endDate?: number;
    eventType?: AuditEventType[];
    userId?: Id<"users">;
    tenantId?: Id<"tenants">;
    limit?: number;
  }
): Promise<AuditLog[]> {
  // This would query an audit logs table
  // Implementation depends on whether you're using:
  // - Convex audit logs table
  // - External service (Sentry, DataDog, etc.)
  // - Custom solution

  await logAuditEvent(ctx, "admin.data_export", {
    filters,
    reason: "Audit log query",
  });

  // Placeholder return
  return [];
}

/**
 * Export audit logs for compliance (admin only)
 */
export async function exportAuditLogs(
  ctx: MutationCtx,
  filters: {
    startDate: number;
    endDate: number;
    format?: "json" | "csv";
  }
): Promise<Blob> {
  // Require admin access
  // This would generate a downloadable export of audit logs

  await logAuditEvent(ctx, "admin.data_export", {
    filters,
    format: filters.format || "json",
  });

  // Placeholder - implement based on your storage solution
  return new Blob();
}

/**
 * Clean up old audit logs (should be run as a scheduled job)
 */
export async function cleanupOldAuditLogs(
  ctx: MutationCtx,
  retentionDays: number = AUDIT_RETENTION_DAYS.MEDIUM
): Promise<number> {
  // Remove audit logs older than the retention period
  // This should be implemented as a Convex action or cron job

  await logAuditEvent(ctx, "admin.settings_changed", {
    action: "audit_cleanup",
    retentionDays,
  });

  // Placeholder - implement based on your storage solution
  return 0;
}

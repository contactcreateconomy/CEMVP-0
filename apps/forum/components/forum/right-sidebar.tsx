"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@createconomy/convex/client";
import {
  Trophy,
  Zap,
  Users,
  MessageSquare,
  FileText,
  Crown,
  Medal,
  Award,
  Gift,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@createconomy/ui";
import { Button } from "@createconomy/ui";
import { cn, formatNumber } from "@createconomy/utils";
import { useForumTenant, useMockUser } from "@/hooks";

interface RightSidebarProps {
  className?: string;
}

export function RightSidebar({ className }: RightSidebarProps) {
  const { tenantId } = useForumTenant();
  const { userId } = useMockUser();
  const [hoveredUser, setHoveredUser] = useState<number | null>(null);

  // Fetch leaderboard from Convex
  const leaderboard = useQuery(
    // @ts-expect-error - api object pattern causes type mismatch, runtime works correctly
    api.forum.getLeaderboard,
    tenantId ? { tenantId, limit: 10 } : "skip"
  );

  // Fetch stats from Convex
  const stats = useQuery(
    // @ts-expect-error - api object pattern causes type mismatch, runtime works correctly
    api.forum.getForumStats,
    tenantId ? { tenantId } : "skip"
  );

  // Fetch active campaigns from Convex
  const campaigns = useQuery(
    // @ts-expect-error - api object pattern causes type mismatch, runtime works correctly
    api.forum.getActiveCampaigns,
    tenantId ? { tenantId } : "skip"
  );

  // Get first campaign for display
  const campaign = campaigns?.[0];

  // Check if user has joined campaign
  const hasJoined = useQuery(
    // @ts-expect-error - api object pattern causes type mismatch, runtime works correctly
    api.forum.hasUserJoinedCampaign,
    campaign && userId ? { userId, campaignId: campaign._id } : "skip"
  );

  // Toggle campaign participation
  const toggleCampaign = useMutation(
    // @ts-expect-error - api object pattern causes type mismatch, runtime works correctly
    api.forum.toggleCampaignParticipation
  );

  const handleCampaignToggle = async () => {
    if (!campaign || !userId) return;
    try {
      await toggleCampaign({ userId, campaignId: campaign._id });
    } catch (error) {
      console.error("Failed to toggle campaign participation:", error);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 2:
        return <Medal className="h-4 w-4 text-gray-400" />;
      case 3:
        return <Award className="h-4 w-4 text-amber-600" />;
      default:
        return <span className="text-xs font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  // Format stats for display
  const statsData = stats ? [
    {
      label: "Members",
      value: formatNumber(stats.members),
      icon: Users,
    },
    {
      label: "Discussions",
      value: formatNumber(stats.discussions),
      icon: FileText,
    },
    {
      label: "Comments",
      value: formatNumber(stats.comments),
      icon: MessageSquare,
    },
  ] : [];

  // Campaign progress percentage
  const campaignProgress = campaign
    ? Math.min(100, (campaign.currentProgress / campaign.targetPoints) * 100)
    : 0;

  return (
    <aside className={cn("flex flex-col gap-4 p-4", className)}>
      {/* Leaderboard */}
      {leaderboard && leaderboard.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Leaderboard</h3>
          </div>

          <div className="space-y-2">
            {leaderboard.map((entry: any, index: number) => {
              const rank = index + 1; // leaderboard is already sorted by points
              const user = entry.user;

              return (
                <div
                  key={entry._id}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-2 py-2 transition-all duration-200",
                    hoveredUser === rank ? "bg-accent" : "",
                    rank <= 3 && "bg-muted/50"
                  )}
                  onMouseEnter={() => setHoveredUser(rank)}
                  onMouseLeave={() => setHoveredUser(null)}
                  style={{
                    animation: `fadeInRight 0.4s ease-out ${index * 50}ms both`,
                  }}
                >
                  <div className="flex h-6 w-6 items-center justify-center">
                    {getRankIcon(rank)}
                  </div>

                  <Avatar
                    className={cn(
                      "h-8 w-8 ring-2 transition-all duration-300",
                      hoveredUser === rank ? "scale-110 ring-primary/50" : "ring-transparent"
                    )}
                  >
                    <AvatarImage src={user.image || "/placeholder.svg"} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {user?.name ?? "Unknown"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      @{user?.username ?? user?.name.toLowerCase().replace(/\s/g, "") ?? "unknown"}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-primary" />
                    <span className="text-xs font-semibold text-foreground">
                      {formatNumber(entry.points)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Campaign Widget */}
      {campaign && (
        <div className="relative overflow-hidden rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-4 shadow-sm">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          <div className="relative">
            <div className="mb-3 flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Active Campaign
              </span>
            </div>

            <h4 className="mb-2 text-lg font-bold text-foreground">
              {campaign.title}
            </h4>
            <p className="mb-4 text-sm text-muted-foreground">
              {campaign.description}
            </p>

            <div className="mb-4">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">
                  {formatNumber(campaign.currentProgress)} / {formatNumber(campaign.targetPoints)} pts
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-1000"
                  style={{ width: `${campaignProgress}%` }}
                />
              </div>
            </div>

            <Button
              onClick={handleCampaignToggle}
              className={cn(
                "w-full transition-all duration-300",
                hasJoined
                  ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  : "bg-primary hover:scale-[1.02]"
              )}
            >
              {hasJoined ? "Joined" : "Join Campaign"}
            </Button>
          </div>
        </div>
      )}

      {/* Stats Widget */}
      {stats && (
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <h3 className="mb-4 font-semibold text-foreground">Community Stats</h3>
          <div className="grid grid-cols-3 gap-2">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group flex flex-col items-center rounded-lg bg-muted/50 p-3 transition-all duration-200 hover:bg-accent"
                  style={{
                    animation: `fadeInUp 0.4s ease-out ${index * 100}ms both`,
                  }}
                >
                  <Icon className="mb-1 h-4 w-4 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
                  <span className="text-lg font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </aside>
  );
}

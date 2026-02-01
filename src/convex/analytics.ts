import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

/**
 * Public mutation for tracking analytics events from React components.
 * Fire-and-forget: call without awaiting the result.
 */
export const trackEvent = mutation({
  args: {
    eventType: v.string(),
    metadata: v.optional(v.object({
      gameSize: v.optional(v.string()),
      queryParams: v.optional(v.string()),
      roundNumber: v.optional(v.number()),
      totalRounds: v.optional(v.number()),
    })),
  },
  handler: async (ctx, { eventType, metadata }) => {
    await ctx.db.insert("analyticsEvents", {
      eventType,
      timestamp: Date.now(),
      metadata,
    });
  },
});

/**
 * Get total count of completed drafts
 */
export const getTotalDraftsCompleted = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db
      .query("analyticsEvents")
      .withIndex("by_type", (q) => q.eq("eventType", "draft_completed"))
      .collect();
    return events.length;
  },
});

/**
 * Get drafts per day for the last N days
 */
export const getDraftsPerDay = query({
  args: { days: v.number() },
  handler: async (ctx, { days }) => {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const events = await ctx.db
      .query("analyticsEvents")
      .withIndex("by_type_and_timestamp", (q) =>
        q.eq("eventType", "draft_completed").gte("timestamp", cutoff)
      )
      .collect();

    const counts: Record<string, number> = {};
    for (const event of events) {
      const date = new Date(event.timestamp).toISOString().split("T")[0];
      counts[date] = (counts[date] || 0) + 1;
    }
    return counts;
  },
});

/**
 * Get popular game sizes
 */
export const getPopularGameSizes = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db
      .query("analyticsEvents")
      .withIndex("by_type", (q) => q.eq("eventType", "draft_completed"))
      .collect();

    const counts: Record<string, number> = {};
    for (const event of events) {
      const gameSize = event.metadata?.gameSize || "unknown";
      counts[gameSize] = (counts[gameSize] || 0) + 1;
    }
    return counts;
  },
});

/**
 * Get event counts by type
 */
export const getEventCounts = query({
  args: {},
  handler: async (ctx) => {
    const allEvents = await ctx.db.query("analyticsEvents").collect();
    const counts: Record<string, number> = {};
    for (const event of allEvents) {
      counts[event.eventType] = (counts[event.eventType] || 0) + 1;
    }
    return counts;
  },
});

/**
 * Internal mutation to clean up old analytics events (called by cron)
 */
export const cleanupOldEvents = internalMutation({
  args: { retentionDays: v.number() },
  handler: async (ctx, { retentionDays }) => {
    const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
    const oldEvents = await ctx.db
      .query("analyticsEvents")
      .withIndex("by_timestamp", (q) => q.lt("timestamp", cutoff))
      .collect();

    let deleted = 0;
    for (const event of oldEvents) {
      await ctx.db.delete(event._id);
      deleted++;
    }

    if (deleted > 0) {
      console.log(`[analytics] Cleaned up ${deleted} events older than ${retentionDays} days`);
    }
  },
});

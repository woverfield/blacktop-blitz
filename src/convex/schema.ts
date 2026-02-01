import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  feedback: defineTable({
    type: v.string(), // "feature" | "bug" | "improvement" | "other"
    title: v.string(),
    description: v.string(),
    status: v.string(), // "pending" | "planned" | "completed" | "declined"
    upvotes: v.number(),
    upvoterIds: v.array(v.string()), // Track who voted (prevent double voting)
    authorName: v.optional(v.string()),
    createdAt: v.string(),
  })
    .index("by_upvotes", ["upvotes"])
    .index("by_status", ["status"]),

  analyticsEvents: defineTable({
    eventType: v.string(),
    timestamp: v.number(),
    metadata: v.optional(v.object({
      gameSize: v.optional(v.string()),      // "1v1", "2v2", etc.
      queryParams: v.optional(v.string()),   // JSON of filters used
      roundNumber: v.optional(v.number()),
      totalRounds: v.optional(v.number()),
    })),
  })
    .index("by_type", ["eventType"])
    .index("by_timestamp", ["timestamp"])
    .index("by_type_and_timestamp", ["eventType", "timestamp"]),
});

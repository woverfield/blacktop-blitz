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
});

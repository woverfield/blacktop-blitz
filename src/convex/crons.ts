import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.daily(
  "cleanup-old-analytics",
  { hourUTC: 4, minuteUTC: 0 },  // Run daily at 4am UTC
  internal.analytics.cleanupOldEvents,
  { retentionDays: 90 }
);

export default crons;

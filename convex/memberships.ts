import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";
import { hasOrgAccess } from "./documents";

export const addUserIdToOrg = internalMutation({
  args: {
    orgId: v.string(),
    userId: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("memberships", {
      orgId: args.orgId,
      userId: args.userId,
    });
  },
});

export const removeUserIdFromOrg = internalMutation({
  args: {
    orgId: v.string(),
    userId: v.string(),
  },
  async handler(ctx, args) {
    const membership = await ctx.db
      .query("memberships")
      .withIndex("by_orgId_userId", (q) =>
        q.eq("orgId", args.orgId).eq("userId", args.userId)
      )
      .first();

    if (membership) {
      await ctx.db.delete(membership._id);
    }
  },
});

export const hasOrgAccessQuery = internalQuery({
  args: {
    orgId: v.string(),
  },
  async handler(ctx, args) {
    return await hasOrgAccess(ctx, args.orgId);
  },
});

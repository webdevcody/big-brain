
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getDocuments = query({
  async handler(ctx) {
    return await ctx.db.query('documents').collect()
  },
})

export const createDocument = mutation({
  args: {
    title: v.string()
  },
  async handler(ctx, args) {
    await ctx.db.insert('documents', {
      title: args.title
    })
  },
})
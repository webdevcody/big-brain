import { v } from "convex/values";
import { action } from "./_generated/server";
import { embed } from "./notes";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

export const searchAction = action({
  args: {
    search: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }

    const embedding = await embed(args.search);

    const noteResults = await ctx.vectorSearch("notes", "by_embedding", {
      vector: embedding,
      limit: 5,
      filter: (q) => q.eq("tokenIdentifier", userId),
    });

    const documentResults = await ctx.vectorSearch(
      "documents",
      "by_embedding",
      {
        vector: embedding,
        limit: 5,
        filter: (q) => q.eq("tokenIdentifier", userId),
      }
    );

    const records: (
      | { type: "notes"; score: number; record: Doc<"notes"> }
      | { type: "documents"; score: number; record: Doc<"documents"> }
    )[] = [];

    await Promise.all(
      noteResults.map(async (result) => {
        const note = await ctx.runQuery(api.notes.getNote, {
          noteId: result._id,
        });
        if (!note) {
          return;
        }
        records.push({
          record: note,
          score: result._score,
          type: "notes",
        });
      })
    );

    await Promise.all(
      documentResults.map(async (result) => {
        const document = await ctx.runQuery(api.documents.getDocument, {
          documentId: result._id,
        });
        if (!document) {
          return;
        }
        records.push({
          record: document,
          type: "documents",
          score: result._score,
        });
      })
    );

    records.sort((a, b) => b.score - a.score);

    return records;
  },
});

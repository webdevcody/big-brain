import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    tokenIdentifier: v.string(),
    fileId: v.id("_storage"),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
  chats: defineTable({
    documentId: v.id("documents"),
    tokenIdentifier: v.string(),
    isHuman: v.boolean(),
    text: v.string(),
  }).index("by_documentId_tokenIdentifier", ["documentId", "tokenIdentifier"]),
});

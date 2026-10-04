import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getMessages = query({
  args: {
    to: v.string(),
    from: v.string(),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .filter((q) =>
        q.or(
          q.and(q.eq(q.field("to"), args.to), q.eq(q.field("from"), args.from)),
          q.and(q.eq(q.field("to"), args.from), q.eq(q.field("from"), args.to)),
        ),
      )
      .collect();
    return messages;
  },
});

export const sendMessage = mutation({
  args: {
    to: v.string(),
    text: v.string(),
    from: v.string(),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      to: args.to,
      text: args.text,
      from: args.from,
    });
    return messageId;
  },
});

export const deleteMessage = mutation({
  args: {
    id: v.id("messages"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

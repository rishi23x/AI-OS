import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const agents = pgTable("agents", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  systemPrompt: text("system_prompt").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

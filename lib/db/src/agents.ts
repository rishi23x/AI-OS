import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const agents = pgTable("agents", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: text("user_id"),

  name: text("name").notNull(),

  role: text("role").notNull(),

  description: text("description"),

  systemPrompt: text("system_prompt").notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

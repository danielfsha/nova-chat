import { generateId } from "ai";
import { InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  varchar,
  json,
} from "drizzle-orm/pg-core";

// Change all id/userId/chatId/... to text instead of uuid

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type User = InferSelectModel<typeof user>;

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export type Session = InferSelectModel<typeof session>;

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export type Account = InferSelectModel<typeof account>;

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export type Verification = InferSelectModel<typeof verification>;

export const chat = pgTable("chat", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => generateId()),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  title: text("title").notNull().default("New Chat"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  visibility: varchar("visibility", { enum: ["public", "private"] })
    .notNull()
    .default("private"),
});

export type Chat = InferSelectModel<typeof chat>;

export const message = pgTable("message", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => generateId()),
  chatId: text("chat_id")
    .notNull()
    .references(() => chat.id, { onDelete: "cascade" }),
  role: text("role").notNull(), // user, assistant, or tool
  parts: json("parts").notNull(), // Store parts as JSON in the database
  attachments: json("attachments").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Message = InferSelectModel<typeof message>;

export const stream = pgTable("stream", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateId()),
  chatId: text("chatId")
    .notNull()
    .references(() => chat.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export type Stream = InferSelectModel<typeof stream>;

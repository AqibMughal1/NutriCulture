import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().notNull(),
  image: text(),
  createdAt: timestamp().notNull(),
  updatedAt: timestamp().notNull(),

  role: text().default("user"),
  banned: boolean().default(false),
  banReason: text(),
  banExpires: timestamp(),

  stripeCustomerId: text(),
});

export const sessions = pgTable("sessions", {
  id: text().primaryKey(),
  expiresAt: timestamp().notNull(),
  token: text().notNull().unique(),
  createdAt: timestamp().notNull(),
  updatedAt: timestamp().notNull(),
  ipAddress: text(),
  userAgent: text(),
  impersonatedBy: text(),
  userId: text()
    .notNull()
    .references(() => users.id),
});

export const accounts = pgTable("accounts", {
  id: text().primaryKey(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text()
    .notNull()
    .references(() => users.id),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: timestamp(),
  refreshTokenExpiresAt: timestamp(),
  scope: text(),
  password: text(),
  createdAt: timestamp().notNull(),
  updatedAt: timestamp().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: text().primaryKey(),
  plan: text().notNull(),
  referenceId: text().notNull(),
  stripeCustomerId: text(),
  stripeSubscriptionId: text(),
  status: text(),
  periodStart: timestamp(),
  periodEnd: timestamp(),
  cancelAtPeriodEnd: boolean(),
  seats: integer(),
});

export const verifications = pgTable("verifications", {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp().notNull(),
  createdAt: timestamp(),
  updatedAt: timestamp(),
});

export const projects = pgTable("projects", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: text().notNull(),
  userId: text()
    .notNull()
    .references(() => users.id),

  cloudProvider: text(),
  additionalNotes: text(),

  type: text({
    enum: [
      "new-deployment-guide",
      "existing-deployment-guide",
      "submit-requirements-to-get-deployment-guide",
      "upload-config-to-get-recommendations",
      "nutrition-chat",
    ],
  })
    .notNull()
    .default("new-deployment-guide"),

  configFileContent: text(),
  optimizationType: text({
    enum: ["cost", "performance", "balanced"],
  }),

  // Deployment requirements fields
  applicationType: text(),
  language: text(),
  framework: text(),
  frontendTech: text(),
  sourceRepository: text(),
  buildInstructions: text(),
  environmentVariables: text(),
  portsToExpose: text(),
  osRequirements: text(),
  requiresDatabase: boolean(),
  databaseType: text(),
  databaseSchema: text(),
  hasCustomDomain: boolean(),
  domainName: text(),

  // Generated deployment guide
  generatedDeploymentGuide: text(),

  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  projectId: uuid()
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  role: text().notNull(),
  parts: json().notNull(),
  attachments: json().notNull(),
  createdAt: timestamp().notNull(),
});

export const purchases = pgTable("purchases", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  amount: numeric().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const projectRelations = relations(projects, ({ many, one }) => ({
  messages: many(messages),
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}));

export const messageRelations = relations(messages, ({ one }) => ({
  project: one(projects, {
    fields: [messages.projectId],
    references: [projects.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  purchases: many(purchases),
}));

export const purchasesRelations = relations(purchases, ({ one }) => ({
  user: one(users, {
    fields: [purchases.userId],
    references: [users.id],
  }),
}));

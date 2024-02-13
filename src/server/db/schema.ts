import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";
import { users, prices, subscriptionStatus } from './../../../migrations/schema';
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `whiteboard_${name}`);


export const workspaces = createTable('workspaces', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', {
    withTimeZone: true,
    mode: "string",
  }),
  workspaceOwner: uuid('workspace_owner').notNull(),
  title: text('title').notNull(),
  iconId: text('icon_id').notNull(),
  data: text('data'),
  inTrash: text('in_trash'),
  logo: text('logo'),
  // bannerUrl: text('banner_url'),
})

export const folders = createTable('folders', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', {
    withTimeZone: true,
    mode: 'string',
  }),
  title: text('title').notNull(),
  iconId: text('icon_id').notNull(),
  data: text('data'),
  inTrash: text('in_trash'),
  bannerUrl: text('banner_url'),
  workspaceId: uuid('workspace_id')
  .notNull()
  .references(() => workspaces.id, {
    onDelete: 'cascade',
  }),
})

export const files = createTable('files', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', {
    withTimeZone: true,
    mode: 'string',
  }),
  title: text('title').notNull(),
  iconId: text('icon_id').notNull(),
  data: text('data'),
  inTrash: text('in_trash'),
  bannerUrl: text('banner_url'),
  workspaceId: uuid('workspace_id')
  .notNull()
  .references(() => workspaces.id, {
    onDelete: 'cascade',
  }),
  folderId: uuid('folder_id')
  .notNull()
  .references(() => folders.id, {
    onDelete: 'cascade',
  }),
})

export const subscriptions = pgTable("subscriptions", {
	id: text("id").primaryKey().notNull(),
	userId: uuid("user_id").notNull().references(() => users.id),
	status: subscriptionStatus("status"),
	metadata: jsonb("metadata"),
	priceId: text("price_id").references(() => prices.id),
	quantity: integer("quantity"),
	cancelAtPeriodEnd: boolean("cancel_at_period_end"),
	created: timestamp("created", { withTimezone: true, mode: 'string' }).default(sql`now()`).notNull(),
	currentPeriodStart: timestamp("current_period_start", { withTimezone: true, mode: 'string' }).default(sql`now()`).notNull(),
	currentPeriodEnd: timestamp("current_period_end", { withTimezone: true, mode: 'string' }).default(sql`now()`).notNull(),
	endedAt: timestamp("ended_at", { withTimezone: true, mode: 'string' }).default(sql`now()`),
	cancelAt: timestamp("cancel_at", { withTimezone: true, mode: 'string' }).default(sql`now()`),
	canceledAt: timestamp("canceled_at", { withTimezone: true, mode: 'string' }).default(sql`now()`),
	trialStart: timestamp("trial_start", { withTimezone: true, mode: 'string' }).default(sql`now()`),
	trialEnd: timestamp("trial_end", { withTimezone: true, mode: 'string' }).default(sql`now()`),
});

// export const whiteboardSubscriptions = createTable("whiteboard_subscriptions", {
// 	id: text("id").primaryKey().notNull(),
// 	userId: uuid("user_id").notNull().references(() => whiteboardUsers.id),
// 	status: subscriptionStatus("status"),
// 	metadata: jsonb("metadata"),
// 	priceId: text("price_id").references(() => whiteboardPrices.id),
// 	quantity: integer("quantity"),
// 	cancelAtPeriodEnd: boolean("cancel_at_period_end"),
// 	created: timestamp("created", { withTimezone: true, mode: 'string' }).default(sql`now()`).notNull(),
// 	currentPeriodStart: timestamp("current_period_start", { withTimezone: true, mode: 'string' }).default(sql`now()`).notNull(),
// 	currentPeriodEnd: timestamp("current_period_end", { withTimezone: true, mode: 'string' }).default(sql`now()`).notNull(),
// 	endedAt: timestamp("ended_at", { withTimezone: true, mode: 'string' }).default(sql`now()`),
// 	cancelAt: timestamp("cancel_at", { withTimezone: true, mode: 'string' }).default(sql`now()`),
// 	canceledAt: timestamp("canceled_at", { withTimezone: true, mode: 'string' }).default(sql`now()`),
// 	trialStart: timestamp("trial_start", { withTimezone: true, mode: 'string' }).default(sql`now()`),
// 	trialEnd: timestamp("trial_end", { withTimezone: true, mode: 'string' }).default(sql`now()`),
// });
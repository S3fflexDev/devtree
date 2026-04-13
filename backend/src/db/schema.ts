
import { pgTable, serial, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";

// Tabla de Usuarios
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 50 }).notNull().unique(), // Ej: juanperez
    email: varchar("email").notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    displayName: varchar("display_name", { length: 100 }), // Ej: Juan Pérez
    bio: text("bio"), // Ej: "Frontend Dev enamorado de Solid.js"
    avatarUrl: text("avatar_url"),
    createdAt: timestamp("created_at").defaultNow(),
    emailVerified: boolean("email_verified").default(false).notNull(),
});

// Tabla de Enlaces (Los botones del DevTree)
export const links = pgTable("links", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id).notNull(),

    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),

    url: text("url").notNull(),
    type: varchar("type", { length: 50 }).notNull().default("url"),

    icon: varchar("icon", { length: 100 }),
    imageUrl: text("image_url"),

    order: integer("order").notNull().default(0),

    isActive: boolean("is_active").notNull().default(true),
    isArchived: boolean("is_archived").notNull().default(false),
    openInNewTab: boolean("open_in_new_tab").notNull().default(true),

    clickCount: integer("click_count").notNull().default(0),

    publishedAt: timestamp("published_at"),
    expiresAt: timestamp("expires_at"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
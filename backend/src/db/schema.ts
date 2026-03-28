// backend/src/db/schema.ts
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
    userId: integer("user_id").references(() => users.id).notNull(), // A qué usuario pertenece este link
    title: varchar("title", { length: 100 }).notNull(), // Ej: "Mi GitHub"
    url: text("url").notNull(), // Ej: "https://github.com/juanperez"
    order: integer("order").notNull().default(0), // CLAVE para el Drag & Drop luego
    createdAt: timestamp("created_at").defaultNow(),
});
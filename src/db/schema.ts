import { pgTable, serial, text, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // in PHP pesos
  category: text("category").notNull().default("Facebook"),
  platform: text("platform").notNull().default("facebook"),
  badge: text("badge"), // e.g., Popular, Best Value
  stockLabel: text("stock_label").default("In Stock"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  fbProfile: text("fb_profile").notNull(),
  email: text("email"),
  notes: text("notes"),
  totalAmount: integer("total_amount").notNull(),
  receiptUrl: text("receipt_url").notNull(),
  receiptFilename: text("receipt_filename").notNull(),
  status: text("status").notNull().default("pending"), // pending | verified | processing | completed | rejected
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id").references(() => products.id),
  productName: text("product_name").notNull(),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull(),
});

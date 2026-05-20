import { pgTable, uuid, timestamp, varchar, text, integer, boolean } from 'drizzle-orm/pg-core'

export const chaiSampleOrders = pgTable('chai_sample_orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  // customer
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  email: varchar('email', { length: 255 }),
  address: text('address').notNull(),
  state: varchar('state', { length: 100 }),
  pincode: varchar('pincode', { length: 20 }).notNull(),
  gstOrTaxId: varchar('gst_or_tax_id', { length: 50 }),
  businessType: varchar('business_type', { length: 50 }),
  customerType: varchar('customer_type', { length: 20 }).notNull().default('individual'),

  // order
  products: text('products').notNull(), // JSON array of slugs
  tiers: text('tiers').notNull(), // JSON array of {slug, tier}
  quantityTier: varchar('quantity_tier', { length: 10 }).notNull(),
  totalAmount: integer('total_amount').notNull(),

  // cashfree
  linkId: text('link_id').notNull().unique(),
  paymentStatus: text('payment_status').notNull().default('pending'),

  // admin
  notes: text('notes'),
  resolved: boolean('resolved').notNull().default(false),
  resolvedAt: timestamp('resolved_at'),
})

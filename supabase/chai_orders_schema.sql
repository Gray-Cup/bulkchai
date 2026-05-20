-- chai_sample_orders table for /buy-chai order flow
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS chai_sample_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- customer
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    address TEXT NOT NULL,
    state VARCHAR(100),
    pincode VARCHAR(20) NOT NULL,
    gst_or_tax_id VARCHAR(50),
    business_type VARCHAR(50),
    customer_type VARCHAR(20) NOT NULL DEFAULT 'individual',

    -- order
    products TEXT NOT NULL,            -- JSON array of slugs e.g. '["kadak-chai","hotel-chai"]'
    tiers TEXT NOT NULL,               -- JSON array of {slug, tier} objects
    quantity_tier VARCHAR(10) NOT NULL, -- dominant tier: "3kg", "5kg", "10kg", "20kg"
    total_amount INTEGER NOT NULL,     -- order total in INR (whole rupees)

    -- cashfree
    link_id TEXT NOT NULL UNIQUE,
    payment_status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'paid' | 'failed'

    -- admin
    notes TEXT,
    resolved BOOLEAN DEFAULT FALSE NOT NULL,
    resolved_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_chai_orders_created_at ON chai_sample_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chai_orders_payment_status ON chai_sample_orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_chai_orders_link_id ON chai_sample_orders(link_id);
CREATE INDEX IF NOT EXISTS idx_chai_orders_resolved ON chai_sample_orders(resolved);

-- Row Level Security
ALTER TABLE chai_sample_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON chai_sample_orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated reads" ON chai_sample_orders
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated updates" ON chai_sample_orders
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_chai_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trg_chai_orders_updated_at ON chai_sample_orders;
CREATE TRIGGER trg_chai_orders_updated_at
    BEFORE UPDATE ON chai_sample_orders
    FOR EACH ROW EXECUTE FUNCTION update_chai_orders_updated_at();

-- Auto-set resolved_at when resolved flips to true
CREATE OR REPLACE FUNCTION set_chai_orders_resolved_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.resolved = TRUE AND OLD.resolved = FALSE THEN
        NEW.resolved_at = NOW();
    ELSIF NEW.resolved = FALSE THEN
        NEW.resolved_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trg_chai_orders_resolved_at ON chai_sample_orders;
CREATE TRIGGER trg_chai_orders_resolved_at
    BEFORE UPDATE ON chai_sample_orders
    FOR EACH ROW EXECUTE FUNCTION set_chai_orders_resolved_at();

COMMENT ON TABLE chai_sample_orders IS 'Orders placed via /buy-chai — chai blend bag orders with Cashfree payment links';
COMMENT ON COLUMN chai_sample_orders.products IS 'JSON array of product slugs e.g. ["kadak-chai","hotel-chai"]';
COMMENT ON COLUMN chai_sample_orders.tiers IS 'JSON array of {slug, tier} e.g. [{"slug":"kadak-chai","tier":"5kg"}]';
COMMENT ON COLUMN chai_sample_orders.quantity_tier IS 'Most-ordered bag size across the order';
COMMENT ON COLUMN chai_sample_orders.total_amount IS 'Order total in INR (whole rupees, no paise)';
COMMENT ON COLUMN chai_sample_orders.payment_status IS 'pending at creation; update to paid/failed via Cashfree webhook';

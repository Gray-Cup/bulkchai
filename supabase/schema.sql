-- Price Quotes Table Schema for BulkChai
-- Run this SQL in your Supabase SQL Editor to create the table

-- Create the price_quotes table
CREATE TABLE IF NOT EXISTS price_quotes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- Contact Information
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    company_name VARCHAR(255),

    -- Quote Details
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    quantity_kg INTEGER NOT NULL CHECK (quantity_kg >= 50),
    estimated_amount DECIMAL(12, 2),
    message TEXT,

    -- Status
    resolved BOOLEAN DEFAULT FALSE NOT NULL,
    resolved_at TIMESTAMPTZ,
    resolved_by VARCHAR(255),
    notes TEXT,

    -- Metadata
    source_page VARCHAR(255),
    turnstile_token VARCHAR(2048)
);

-- Create index for faster queries on unresolved quotes
CREATE INDEX IF NOT EXISTS idx_price_quotes_resolved ON price_quotes(resolved);
CREATE INDEX IF NOT EXISTS idx_price_quotes_created_at ON price_quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_price_quotes_city_state ON price_quotes(city, state);

-- Enable Row Level Security (RLS)
ALTER TABLE price_quotes ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserts from anonymous users (for the public form)
CREATE POLICY "Allow anonymous inserts" ON price_quotes
    FOR INSERT
    WITH CHECK (true);

-- Create a policy that allows reads only for authenticated users (admin dashboard)
CREATE POLICY "Allow authenticated reads" ON price_quotes
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Create a policy that allows updates only for authenticated users
CREATE POLICY "Allow authenticated updates" ON price_quotes
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at on row updates
DROP TRIGGER IF EXISTS update_price_quotes_updated_at ON price_quotes;
CREATE TRIGGER update_price_quotes_updated_at
    BEFORE UPDATE ON price_quotes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to set resolved_at when resolved is set to true
CREATE OR REPLACE FUNCTION set_resolved_at()
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

-- Trigger to auto-set resolved_at
DROP TRIGGER IF EXISTS set_price_quotes_resolved_at ON price_quotes;
CREATE TRIGGER set_price_quotes_resolved_at
    BEFORE UPDATE ON price_quotes
    FOR EACH ROW
    EXECUTE FUNCTION set_resolved_at();

-- Comments for documentation
COMMENT ON TABLE price_quotes IS 'Stores price quote requests from the BulkChai website';
COMMENT ON COLUMN price_quotes.resolved IS 'Whether the quote has been addressed/resolved by staff';
COMMENT ON COLUMN price_quotes.quantity_kg IS 'Requested quantity in kilograms (minimum 50kg)';
COMMENT ON COLUMN price_quotes.turnstile_token IS 'Cloudflare Turnstile verification token for spam protection';

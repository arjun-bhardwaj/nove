-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    sku TEXT UNIQUE,
    is_active BOOLEAN DEFAULT true,
    low_stock_threshold INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- Create index on is_active for faster filtering
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);

-- Create index on stock_quantity for low stock queries
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock_quantity);

-- Insert sample products (from your existing data)
INSERT INTO products (name, description, price, image, category, stock_quantity, sku, is_active) VALUES
('Nove Signature Nursing Top', 'Our bestselling nursing top with discreet side-access panels. Made from organic bamboo for ultimate comfort.', 15999, 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop', 'essentials', 25, 'NOVE-NST-001', true),
('Bamboo Maternity Dress', 'Elegant A-line dress that grows with you. Features adjustable waist tie and nursing-friendly design.', 18999, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop', 'essentials', 18, 'NOVE-BMD-002', true),
('Comfort Leggings', 'High-waisted leggings with gentle belly support. Moisture-wicking and squat-proof.', 8999, 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop', 'essentials', 40, 'NOVE-CL-003', true),
('Velvet Luxe Maternity Jumpsuit', 'Statement piece in rich velvet. Perfect for special occasions with a flattering empire waist.', 29999, 'https://images.unsplash.com/photo-1583846112476-f74e2b7f7b23?w=800&auto=format&fit=crop', 'evening', 12, 'NOVE-VLJ-004', true),
('Satin Slip Dress - Midnight', 'Timeless slip dress in luxurious satin. Adjustable straps and bias-cut for a perfect drape.', 24999, 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop', 'evening', 8, 'NOVE-SSD-005', true),
('Sequin Evening Gown', 'Show-stopping gown with delicate sequin embellishments. Empire waist with flowing skirt.', 34999, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop', 'evening', 5, 'NOVE-SEG-006', true);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON products
    FOR SELECT
    USING (true);

-- Create policy to allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users full access" ON products
    FOR ALL
    USING (auth.role() = 'authenticated');

COMMENT ON TABLE products IS 'Product catalog with inventory tracking';

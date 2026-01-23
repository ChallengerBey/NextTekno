-- Add missing category column to products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category text DEFAULT 'General';

-- Update existing products with default category
UPDATE public.products SET category = 'General' WHERE category IS NULL;
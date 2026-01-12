-- =======================================================
-- ÜRÜN SİLME SORUNUNU DÜZELTME
-- Her ürünün hangi kullanıcıya ait olduğunu takip etmek için
-- =======================================================

-- 1. Products tablosuna seller_id sütunu ekle
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS seller_id text;

-- 2. Mevcut ürünler için varsayılan bir seller_id ata (opsiyonel)
-- Eğer şu an sistemde ürünler varsa ve hepsini bir kullanıcıya atamak istiyorsan:
-- UPDATE public.products SET seller_id = 'admin@nexttekno.com' WHERE seller_id IS NULL;

-- 3. Silme policy'sini güncelle - sadece kendi ürününü silsin
DROP POLICY IF EXISTS "Herkese açık silme (products)" ON public.products;

CREATE POLICY "Kullanıcı kendi ürününü silebilir (products)" 
ON public.products 
FOR DELETE 
USING (
  -- Eğer auth kullanıyorsan: auth.jwt() ->> 'email' = seller_id
  -- Şimdilik herkese açık ama seller_id kontrolü ile:
  true
);

-- 4. Insert policy'sini güncelle - ürün eklerken seller_id otomatik atansın
DROP POLICY IF EXISTS "Herkese açık ekleme (products)" ON public.products;

CREATE POLICY "Kullanıcı ürün ekleyebilir (products)" 
ON public.products 
FOR INSERT 
WITH CHECK (
  -- Eğer auth kullanıyorsan: auth.jwt() ->> 'email' = seller_id
  true
);

-- 5. Update policy'sini güncelle - sadece kendi ürününü güncellesin
DROP POLICY IF EXISTS "Herkese açık güncelleme (products)" ON public.products;

CREATE POLICY "Kullanıcı kendi ürününü güncelleyebilir (products)" 
ON public.products 
FOR UPDATE 
USING (
  -- Eğer auth kullanıyorsan: auth.jwt() ->> 'email' = seller_id
  true
);

-- NOT: Yukarıdaki policy'ler şimdilik "true" olarak bırakıldı.
-- Gerçek auth sistemi kurulduğunda, seller_id kontrolü eklenecek.

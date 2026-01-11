-- =======================================================
-- NEXTTEKNO DEPOLAMA (STORAGE) KURULUM KODLARI
-- Supabase SQL Editor kısmına yapıştırıp "Run" tuşuna bas.
-- =======================================================

-- 1. "products" adında herkese açık bir kova (bucket) oluştur.
-- Eğer hata alırsan bu kovayı Supabase sol menüden "Storage" -> "Create new bucket" diyerek de açabilirsin.
insert into storage.buckets (id, name, public) 
values ('products', 'products', true)
on conflict (id) do nothing;

-- 2. Depolama Güvenlik Kuralları (Policies)

-- Herkesin resimleri görmesine izin ver
create policy "Resimler Herkese Açık (Select)"
  on storage.objects for select
  using ( bucket_id = 'products' );

-- Sadece giriş yapmış kullanıcıların (veya demo için herkesin) resim yüklemesine izin ver
-- Not: Pratikte "auth.role() = 'authenticated'" kullanılmalı ama
-- anonim erişimle test ettiğimiz için şimdilik herkese açıyoruz.
create policy "Resim Yükleme İzni (Insert)"
  on storage.objects for insert
  with check ( bucket_id = 'products' );
  
-- Silme izni
create policy "Resim Silme İzni (Delete)"
  on storage.objects for delete
  using ( bucket_id = 'products' );


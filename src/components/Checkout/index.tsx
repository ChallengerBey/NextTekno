"use client";
import React, { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Login from "./Login";
import Shipping from "./Shipping";
import Billing from "./Billing";
import Coupon from "./Coupon";
import { useAdmin } from "@/app/context/AdminContext";
import { useAppSelector } from "@/redux/store";
import { selectCartItems, selectTotalPrice } from "@/redux/features/cart-slice";
import toast from "react-hot-toast";

const Checkout = () => {
  const { addOrder } = useAdmin();

  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const shippingCost = items.length > 0 ? 15 : 0;
  const finalTotal = totalPrice + shippingCost;

  const [paymentHtml, setPaymentHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Sepetiniz boş!");
      return;
    }

    setLoading(true);
    console.log("🚀 Ödeme süreci başlatılıyor...");

    try {
      // 1. Backend'e İstek At
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          basketItems: items,
          totalPrice: finalTotal.toFixed(2),
          // BURASI ÖNEMLİ: İleride form verilerini buradan dinamik almalısın
          user: {
            firstName: "Misafir",
            lastName: "Kullanıcı",
            email: "guest@example.com",
            address: "Test Adresi Istanbul",
            town: "Istanbul",
            country: "Turkey",
            phone: "+905000000000"
          }
        })
      });

      // 2. Cevabı Al ve Parse Et
      const responseText = await response.text();
      console.log("📥 API Ham Cevap:", responseText); // Debug için önemli

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("❌ JSON Hatası:", e);
        toast.error("Sunucudan bozuk yanıt geldi.");
        setLoading(false);
        return;
      }

      // 3. Iyzico Başarılı mı?
      if (data.status === 'success' && data.checkoutFormContent) {
        console.log("✅ Ödeme formu alındı, ekrana basılıyor...");
        
        // HTML'i state'e atıyoruz
        setPaymentHtml(data.checkoutFormContent);

        // --- IYZICO SCRIPT ÇALIŞTIRMA TAKTİĞİ ---
        // React'ın render etmesini beklemeden DOM'a müdahale etmiyoruz.
        // State güncellendikten sonra React otomatik olarak dangerouslySetInnerHTML ile içeriği basacak.
        // ANCAK script'in çalışması için ufak bir tetikleyici lazım olabilir ama
        // Iyzico genelde inline script ile kendini tetikler. Eğer form gelmezse aşağıdaki useEffect'i açacağız.

      } else {
        console.error("❌ Iyzico Hatası:", data);
        toast.error("Hata: " + (data.errorMessage || "Ödeme başlatılamadı"));
      }

    } catch (error) {
      console.error("🚨 Kritik Hata:", error);
      toast.error("Bir bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb title={"Ödeme"} pages={["ödeme"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form onSubmit={handleCheckout}>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              
              {/* SOL TARAFI (FORM ALANLARI) AYNI BIRAKTIM, KISALTTIM */}
              <div className="lg:max-w-[670px] w-full">
                 <Login />
                 <Billing />
                 <Shipping />
              </div>

              {/* SAĞ TARAF (ÖZET VE IYZICO) */}
              <div className="max-w-[455px] w-full">
                <div className="bg-white shadow-1 rounded-[10px]">
                  {/* ... Sepet Özeti Kodların Buraya Gelecek (Aynı Kalabilir) ... */}
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">Toplam: ?{finalTotal.toFixed(2)}</h3>
                  </div>
                </div>

                <Coupon />

                {/* --- IYZICO FORM ALANI (EN ÖNEMLİ KISIM) --- */}
                <div className="mt-8 bg-white p-4 rounded-lg shadow-lg border-2 border-blue-500">
                    <div id="iyzipay-checkout-form" className="responsive"></div>
                    
                    {/* HTML GELDİĞİNDE BURAYA BASILACAK */}
                    {paymentHtml && (
                        <div 
                            dangerouslySetInnerHTML={{ __html: paymentHtml }} 
                            // React scriptleri çalıştırmazsa bu div içine basılan script
                            // manuel tetiklenmelidir. Ancak Iyzico genelde kendi div'ini bulur.
                        />
                    )}
                </div>

                {/* Ödeme Formu Yoksa Butonu Göster */}
                {!paymentHtml && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5 disabled:opacity-70"
                  >
                    {loading ? "Ödeme Formu Yükleniyor..." : "Siparişi Tamamla & Öde"}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
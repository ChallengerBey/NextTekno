"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Login from "./Login";
import Shipping from "./Shipping";
import Billing from "./Billing";
import Coupon from "./Coupon";
import { useAdmin } from "@/app/context/AdminContext";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/redux/store";
import { selectCartItems, selectTotalPrice } from "@/redux/features/cart-slice";
import toast from "react-hot-toast";

const Checkout = () => {
  const { addOrder } = useAdmin();
  const router = useRouter();

  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const shippingCost = items.length > 0 ? 15 : 0;
  const finalTotal = totalPrice + shippingCost;

  const [paymentHtml, setPaymentHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Helper to execute scripts in injected HTML (needed for Iyzico)
  useEffect(() => {
    if (paymentHtml) {
      console.log("Processing payment HTML scripts...");
      const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gmi;
      let match;
      while ((match = scriptRegex.exec(paymentHtml)) !== null) {
        console.log("Found script tag:", match[0]); // Log entire tag
        try {
          // Create a new script element to ensure execution
          const script = document.createElement("script");
          // Check if it has src or inline content
          if (match[0].includes('src=')) {
            const srcMatch = /src=["'](.*?)["']/.exec(match[0]);
            if (srcMatch && srcMatch[1]) {
              script.src = srcMatch[1];
              console.log("Injecting external script:", script.src);
            }
          } else {
            script.text = match[1];
            console.log("Injecting inline script:", script.text.substring(0, 50) + "...");
          }
          document.body.appendChild(script);
        } catch (e) {
          console.error("Script execution error", e);
        }
      }
    }
  }, [paymentHtml]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Sepetiniz boş!");
      return;
    }

    setLoading(true);
    console.log("Starting checkout process...");

    try {
      // 1. Get Payment Form from API
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          basketItems: items,
          totalPrice: finalTotal.toFixed(2),
          user: {
            firstName: "Misafir", // In real app, bind to form state
            lastName: "Kullanıcı",
            email: "guest@example.com",
            address: "Test Adresi Istanbul",
            town: "Istanbul",
            country: "Turkey",
            phone: "+905000000000"
          }
        })
      });

      const responseText = await response.text();
      console.log("Raw API Response:", responseText);
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("JSON Parse Error:", e);
        throw new Error("Sunucudan geçersiz yanıt alındı.");
      }

      if (data.status === 'success' && data.checkoutFormContent) {
        console.log("Payment init success, setting HTML...");
        setPaymentHtml(data.checkoutFormContent);

        // Also save order to Supabase as "Pending Payment"
        const newOrder = {
          id: `#${Math.floor(1000 + Math.random() * 9000)}`,
          customer: "Misafir Kullanıcı",
          date: new Date().toLocaleDateString(),
          status: "Beklemede" as const,
          total: `$${finalTotal.toFixed(2)}`,
          items: items
        };
        await addOrder(newOrder);

      } else {
        console.error("Payment init failed logic:", data);
        toast.error("Ödeme formu başlatılamadı: " + (data.errorMessage || "Bilinmeyen hata"));
      }

    } catch (error) {
      console.error("HandleCheckout Exception:", error);
      toast.error("Bir hata oluştu. Konsolu kontrol edin.");
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
              {/* <!-- checkout left --> */}
              <div className="lg:max-w-[670px] w-full">
                {/* <!-- login box --> */}
                <Login />

                {/* <!-- billing details --> */}
                <Billing />

                {/* <!-- address box two --> */}
                <Shipping />

                {/* <!-- others note box --> */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="notes" className="block mb-2.5">
                      Sipariş Notları (Opsiyonel)
                    </label>

                    <textarea
                      name="notes"
                      id="notes"
                      rows={5}
                      placeholder="Siparişinizle ilgili notlar, örn. teslimat için özel notlar."
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* // <!-- checkout right --> */}
              <div className="max-w-[455px] w-full">
                {/* <!-- order list box --> */}
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      Siparişiniz
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {/* <!-- title --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <h4 className="font-medium text-dark">Ürün</h4>
                      </div>
                      <div>
                        <h4 className="font-medium text-dark text-right">
                          Ara Toplam
                        </h4>
                      </div>
                    </div>

                    {/* <!-- product items --> */}
                    {items.length > 0 ? (
                      items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-5 border-b border-gray-3"
                        >
                          <div>
                            <p className="text-dark">
                              {item.title} <span className="text-sm text-gray-500">x{item.quantity}</span>
                            </p>
                          </div>
                          <div>
                            <p className="text-dark text-right">
                              ${(item.discountedPrice * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-5 text-center text-gray-500">
                        Sepetiniz boş.
                      </div>
                    )}

                    {/* <!-- shipping fee --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <p className="text-dark">Kargo Ücreti</p>
                      </div>
                      <div>
                        <p className="text-dark text-right">
                          {items.length > 0 ? "$15.00" : "$0.00"}
                        </p>
                      </div>
                    </div>

                    {/* <!-- total --> */}
                    <div className="flex items-center justify-between pt-5">
                      <div>
                        <p className="font-medium text-lg text-dark">Toplam</p>
                      </div>
                      <div>
                        <p className="font-medium text-lg text-dark text-right">
                          ${(totalPrice + (items.length > 0 ? 15 : 0)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- coupon box --> */}
                <Coupon />

                {/* Iyzico Form Container */}
                <div id="iyzipay-checkout-form" className="responsive"></div>
                {paymentHtml && (
                  <div dangerouslySetInnerHTML={{ __html: paymentHtml }} />
                )}

                {/* <!-- checkout button --> */}
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

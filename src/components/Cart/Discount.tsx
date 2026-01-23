import React, { useState } from "react";
import { Tag, Percent } from "lucide-react";

const Discount = () => {
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      setIsApplied(true);
      // Here you would typically validate the coupon code
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="h-5 w-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-800">İndirim Kodu</h3>
      </div>

      <form onSubmit={handleApplyCoupon}>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="İndirim kodunuzu girin"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Percent className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {isApplied && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-700 font-medium">
                  İndirim kodu başarıyla uygulandı!
                </span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!couponCode.trim() || isApplied}
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isApplied ? "Kod Uygulandı" : "Kodu Uygula"}
          </button>
        </div>
      </form>

      {/* Popular Coupons */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Popüler İndirim Kodları</h4>
        <div className="space-y-2">
          <button
            onClick={() => setCouponCode("WELCOME10")}
            className="w-full text-left p-3 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-orange-700">WELCOME10</span>
              <span className="text-xs text-orange-600">%10 İndirim</span>
            </div>
            <p className="text-xs text-orange-600 mt-1">Yeni üyelere özel</p>
          </button>
          <button
            onClick={() => setCouponCode("SAVE20")}
            className="w-full text-left p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-700">SAVE20</span>
              <span className="text-xs text-blue-600">₺20 İndirim</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">500₺ üzeri alışverişlerde</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discount;

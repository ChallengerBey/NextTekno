import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { ShoppingBag, CreditCard, Truck, Shield } from "lucide-react";

const OrderSummary = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const shippingCost = totalPrice > 150 ? 0 : 15;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="h-5 w-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-800">Sipariş Özeti</h3>
      </div>

      <div className="space-y-4">
        {/* Product Items */}
        {cartItems.map((item, key) => (
          <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 line-clamp-2">{item.title}</p>
              <p className="text-xs text-gray-500 mt-1">Adet: {item.quantity}</p>
            </div>
            <div className="ml-4">
              <p className="text-sm font-semibold text-gray-900">
                ₺{(item.discountedPrice * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}

        {/* Summary Calculations */}
        <div className="space-y-3 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Ara Toplam</span>
            <span className="text-sm font-medium text-gray-900">₺{totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Kargo</span>
            <span className="text-sm font-medium text-gray-900">
              {shippingCost === 0 ? (
                <span className="text-green-600">Ücretsiz</span>
              ) : (
                `₺${shippingCost.toFixed(2)}`
              )}
            </span>
          </div>

          {shippingCost > 0 && (
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-xs text-orange-700">
                ₺{(150 - totalPrice).toFixed(2)} daha alışveriş yapın, kargo ücretsiz olsun!
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <span className="text-lg font-semibold text-gray-900">Toplam</span>
            <span className="text-lg font-bold text-orange-500">₺{finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-4 px-4 rounded-xl font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
        >
          <CreditCard className="h-5 w-5" />
          Ödemeye Geç
        </button>

        {/* Security Features */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-green-500" />
            <span className="text-xs text-gray-600">Hızlı Teslimat</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-500" />
            <span className="text-xs text-gray-600">Güvenli Ödeme</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2">Kabul edilen ödeme yöntemleri:</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
              VISA
            </div>
            <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
              MC
            </div>
            <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
              AX
            </div>
            <div className="w-8 h-5 bg-gray-700 rounded text-white text-xs flex items-center justify-center font-bold">
              TR
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

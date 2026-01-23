"use client";
import React, { useState } from "react";
import { X, MapPin, Plus, Check } from "lucide-react";

interface Address {
  id: string;
  title: string;
  fullAddress: string;
  district: string;
  city: string;
  isDefault: boolean;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (address: Address) => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, onSelectAddress }) => {
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState(false);

  const addresses: Address[] = [
    {
      id: "1",
      title: "Ev",
      fullAddress: "Atatürk Mahallesi, Cumhuriyet Caddesi No:123 Daire:5",
      district: "Kadıköy",
      city: "İstanbul",
      isDefault: true
    },
    {
      id: "2",
      title: "İş",
      fullAddress: "Levent Mahallesi, Büyükdere Caddesi No:456 Kat:8",
      district: "Şişli",
      city: "İstanbul",
      isDefault: false
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Teslimat Adresi Seç</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showAddForm ? (
            <>
              {/* Address List */}
              <div className="space-y-3 mb-6">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(address.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAddress === address.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin size={16} className="text-orange-500" />
                          <span className="font-semibold text-gray-800">{address.title}</span>
                          {address.isDefault && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                              Varsayılan
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{address.fullAddress}</p>
                        <p className="text-sm text-gray-500">{address.district}, {address.city}</p>
                      </div>
                      {selectedAddress === address.id && (
                        <Check size={20} className="text-orange-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Address Button */}
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors text-gray-600 hover:text-orange-600"
              >
                <Plus size={20} />
                Yeni Adres Ekle
              </button>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={() => {
                    const selected = addresses.find(a => a.id === selectedAddress);
                    if (selected) {
                      onSelectAddress(selected);
                      onClose();
                    }
                  }}
                  disabled={!selectedAddress}
                  className="flex-1 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Seç
                </button>
              </div>
            </>
          ) : (
            /* Add Address Form */
            <div>
              <h3 className="text-lg font-semibold mb-4">Yeni Adres Ekle</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Adres başlığı (Ev, İş, vb.)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option>İl Seçin</option>
                  <option>İstanbul</option>
                  <option>Ankara</option>
                  <option>İzmir</option>
                </select>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option>İlçe Seçin</option>
                  <option>Kadıköy</option>
                  <option>Şişli</option>
                  <option>Beşiktaş</option>
                </select>
                <textarea
                  placeholder="Detaylı adres"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                ></textarea>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Geri
                </button>
                <button className="flex-1 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  Kaydet
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
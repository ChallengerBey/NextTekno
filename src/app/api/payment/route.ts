import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log("🚀 IYZICO FINAL TEST...");

    try {
        const body = await req.json();
        const { user, price, basketItems } = body; 

        const Iyzipay = require('iyzipay');

        // SENİN VERDİĞİN KEYLERİ TAM OLARAK YERLEŞTİRDİM
        const iyzipay = new Iyzipay({
            apiKey: 'sandbox-reW0Ko884HvLGp4qMSGDIlg9I00DEaJQ',
            secretKey: 'sandbox-bKwDL5UpypFkWSyHNBZDbsY2NuCEm95w',
            uri: 'https://sandbox-api.iyzipay.com'
        });

        // SEPETİ HAZIRLA
        const itemsFromFrontend = basketItems || [];
        const expandedBasketItems: any[] = [];

        itemsFromFrontend.forEach((item: any) => {
            const qty = item.quantity || 1;
            for (let i = 0; i < qty; i++) {
                expandedBasketItems.push({
                    id: String(item.id),
                    // TÜRKÇE KARAKTER RİSKİNE KARŞI İSİMLERİ SABİTLEDİM
                    name: 'Test Urunu', 
                    category1: 'Genel',
                    category2: 'Urun',
                    itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                    price: String(item.discountedPrice || item.price)
                });
            }
        });

        // KARGO VE FİYAT
        const basketTotal = expandedBasketItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
        const frontendTotal = parseFloat(price);

        if (frontendTotal > basketTotal + 0.01) {
            const shippingCost = (frontendTotal - basketTotal).toFixed(2);
            expandedBasketItems.push({
                id: 'Cargo',
                name: 'Kargo Ucreti', // Ü harfi yok
                category1: 'Kargo',
                category2: 'Kargo',
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: shippingCost
            });
        }

        const finalPrice = expandedBasketItems
            .reduce((acc, item) => acc + parseFloat(item.price), 0)
            .toFixed(2);

        // İSTEK - DİKKAT: BURADAKİ VERİLERDE TÜRKÇE KARAKTER KULLANMADIM
        // Iyzico Node kütüphanesinin hash algoritması bazen Türkçe karakterde patlar.
        const request = {
            locale: Iyzipay.LOCALE.TR,
            conversationId: '123456789',
            price: finalPrice, 
            paidPrice: finalPrice,
            currency: Iyzipay.CURRENCY.TRY,
            basketId: `B${Date.now()}`,
            paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
            callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/payment-callback`,
            enabledInstallments: [2, 3, 6, 9],
            buyer: {
                id: 'USER123',
                name: 'Misafir',
                surname: 'Kullanici',
                gsmNumber: '+905350000000',
                email: 'email@email.com',
                identityNumber: '74300864791',
                lastLoginDate: '2015-10-05 12:43:35',
                registrationDate: '2013-04-21 15:12:09',
                registrationAddress: 'Nidakule Goztepe, Merdivenkoy Mah. Bora Sok. No:1', // Türkçe karakterler temizlendi
                ip: '85.34.78.112',
                city: 'Istanbul',
                country: 'Turkey',
                zipCode: '34732'
            },
            shippingAddress: {
                contactName: 'Misafir Kullanici',
                city: 'Istanbul',
                country: 'Turkey',
                address: 'Nidakule Goztepe, Merdivenkoy Mah. Bora Sok. No:1',
                zipCode: '34742'
            },
            billingAddress: {
                contactName: 'Misafir Kullanici',
                city: 'Istanbul',
                country: 'Turkey',
                address: 'Nidakule Goztepe, Merdivenkoy Mah. Bora Sok. No:1',
                zipCode: '34742'
            },
            basketItems: expandedBasketItems
        };

        console.log(`📝 Fiyat: ${request.price}`);

        const result: any = await new Promise((resolve, reject) => {
            iyzipay.checkoutFormInitialize.create(request, (err: any, res: any) => {
                if (err) {
                    console.error("❌ Kütüphane Hatası:", err);
                    reject(err);
                } else {
                    if(res.status === 'failure') {
                        console.error("❌ Iyzico Hatası:", res.errorMessage);
                        console.error("❌ Hata Kodu:", res.errorCode);
                    } else {
                        console.log("✅ Iyzico Başarılı! HTML Geldi.");
                    }
                    resolve(res);
                }
            });
        });

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("🚨 Sunucu Hatası:", error);
        return NextResponse.json(
            { status: 'failure', errorMessage: error.message },
            { status: 500 }
        );
    }
}
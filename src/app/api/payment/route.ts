import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log("Iyzipay Endpoint Hit");

    try {
        // Use CommonJS require to avoid ESM issues with legacy library
        const Iyzipay = require('iyzipay');

        const iyzipay = new Iyzipay({
            apiKey: process.env.IYZICO_API_KEY || 'sandbox-reW0Ko884HvLGp4qMSGDIlg9I00DEaJQ',
            secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-bKwDL5UpypFkWSyHNBZDbsY2NuCEm95w',
            uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com'
        });

        const body = await req.json();
        const { basketItems, user, totalPrice } = body;

        // Helper to flatten basket items based on quantity
        const expandedBasketItems: any[] = [];

        basketItems.forEach((item: any) => {
            const qty = item.quantity || 1;
            for (let i = 0; i < qty; i++) {
                expandedBasketItems.push({
                    id: String(item.id),
                    name: item.title,
                    category1: 'General',
                    category2: 'Product',
                    itemType: 'PHYSICAL',
                    price: String(item.discountedPrice)
                });
            }
        });

        // Add Shipping
        expandedBasketItems.push({
            id: 'Cargo',
            name: 'Kargo Ücreti',
            category1: 'Cargo',
            category2: 'Cargo',
            itemType: 'PHYSICAL',
            price: '15.00'
        });

        // Recalculate total price 
        const calculatedTotal = expandedBasketItems.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2);

        const request = {
            locale: 'tr',
            conversationId: '123456789',
            price: calculatedTotal,
            paidPrice: calculatedTotal,
            currency: 'TRY',
            basketId: `B${Date.now()}`,
            paymentGroup: 'PRODUCT',
            callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/payment/callback`,
            enabledInstallments: [2, 3, 6, 9],
            buyer: {
                id: 'USER123',
                name: user?.firstName || 'John',
                surname: user?.lastName || 'Doe',
                gsmNumber: user?.phone || '+905350000000',
                email: user?.email || 'email@email.com',
                identityNumber: '74300864791',
                lastLoginDate: '2015-10-05 12:43:35',
                registrationDate: '2013-04-21 15:12:09',
                registrationAddress: user?.address || 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                ip: '85.34.78.112',
                city: user?.town || 'Istanbul',
                country: user?.country || 'Turkey',
                zipCode: '34732'
            },
            shippingAddress: {
                contactName: `${user?.firstName} ${user?.lastName}`,
                city: user?.town || 'Istanbul',
                country: user?.country || 'Turkey',
                address: user?.address || 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                zipCode: '34742'
            },
            billingAddress: {
                contactName: `${user?.firstName} ${user?.lastName}`,
                city: user?.town || 'Istanbul',
                country: user?.country || 'Turkey',
                address: user?.address || 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                zipCode: '34742'
            },
            basketItems: expandedBasketItems
        };

        console.log("Iyzico Request:", JSON.stringify(request, null, 2));

        // Wrap the callback execution in a Promise to await it
        const result: any = await new Promise((resolve, reject) => {
            iyzipay.checkoutFormInitialize.create(request, (err: any, res: any) => {
                console.log("Iyzico Raw Err:", err);
                console.log("Iyzico Raw Result:", res);
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });

        console.log("Iyzico Result Status:", result?.status);

        // Return the resolved result as JSON
        return NextResponse.json(result);

    } catch (error: any) {
        console.error("Payment API Error:", error);
        return NextResponse.json(
            { status: 'failure', errorMessage: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

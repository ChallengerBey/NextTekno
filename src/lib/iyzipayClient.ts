
import Iyzipay from 'iyzipay';

const iyzipay = new Iyzipay({
    apiKey: process.env.IYZICO_API_KEY || 'sandbox-reW0Ko884HvLGp4qMSGDIlg9I00DEaJQ',
    secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-bKwDL5UpypFkWSyHNBZDbsY2NuCEm95w',
    uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com'
});

export default iyzipay;

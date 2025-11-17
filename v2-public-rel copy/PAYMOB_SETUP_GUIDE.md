# 🔐 Paymob Setup Guide - How to Get Your API Keys

## Step 1: Create Paymob Account

1. Go to [https://accept.paymob.com/portal2/en/register](https://accept.paymob.com/portal2/en/register)
2. Click **"Sign Up"** or **"إنشاء حساب"**
3. Fill in your business information:
   - Business Name (اسم النشاط): **Wesaya Restaurant**
   - Email (البريد الإلكتروني)
   - Phone Number (رقم الهاتف)
   - Password (كلمة المرور)
4. Verify your email and phone number
5. Complete the business verification process

---

## Step 2: Get Your API Key

### Option A: From Dashboard
1. Log in to [https://accept.paymob.com/portal2/en/login](https://accept.paymob.com/portal2/en/login)
2. Go to **"Settings"** (الإعدادات) → **"Account Info"** (معلومات الحساب)
3. Find **"API Key"** section
4. Copy your **API Key** (it looks like: `ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5...`)

### Option B: From API Integration
1. Go to **"Developers"** (المطورين) → **"API Keys"**
2. Click **"Show API Key"** or **"عرض مفتاح API"**
3. Copy the key

📝 **Your API Key** → Replace `YOUR_PAYMOB_API_KEY` in `script.js`

---

## Step 3: Get Your Integration ID

1. In Paymob Dashboard, go to **"Developers"** → **"Payment Integrations"**
2. You'll see different payment methods (integrations):
   - **Card Payment** (دفع ببطاقة الائتمان)
   - **Mobile Wallets** (المحافظ الإلكترونية)
   - **Fawry**
   - **Bank Installments**
3. Each integration has an **Integration ID** (معرف التكامل)
4. Click on the integration you want to use (e.g., "Card Payment")
5. Copy the **Integration ID** (it's a number like: `123456`)

💡 **Tip**: You can have multiple integrations. For cards, use the **"Online Card"** integration ID.

📝 **Your Integration ID** → Replace `YOUR_INTEGRATION_ID` in `script.js`

---

## Step 4: Get Your iFrame ID

### Method 1: From Payment Integrations
1. In **"Payment Integrations"** section
2. Look for **"iFrame Integration"** or **"تكامل iFrame"**
3. Find the **iFrame ID** (it's a number like: `789012`)

### Method 2: Create New iFrame
1. Go to **"Developers"** → **"iFrames"**
2. Click **"Create New iFrame"** (إنشاء iFrame جديد)
3. Configure:
   - Name: **Wesaya Restaurant Checkout**
   - Select your integration (Card Payment)
   - Save
4. Copy the **iFrame ID** from the list

📝 **Your iFrame ID** → Replace `YOUR_IFRAME_ID` in `script.js`

---

## Step 5: Update Your Code

Open `/workspaces/wesaya-demo/v2-public-rel copy/script.js` and find this section:

```javascript
// Paymob Configuration (Replace with your actual API keys)
const PAYMOB_CONFIG = {
    apiKey: 'YOUR_PAYMOB_API_KEY', // Replace with your Paymob API key
    integrationId: 'YOUR_INTEGRATION_ID', // Replace with your integration ID
    iframeId: 'YOUR_IFRAME_ID' // Replace with your iframe ID
};
```

Replace with your actual keys:

```javascript
const PAYMOB_CONFIG = {
    apiKey: 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5...', // Your actual API key
    integrationId: 123456, // Your actual integration ID
    iframeId: 789012 // Your actual iframe ID
};
```

---

## Step 6: Setup Webhook (Optional but Recommended)

1. In Paymob Dashboard, go to **"Developers"** → **"Webhooks"**
2. Add your server URL to receive payment confirmations
3. Example: `https://yourdomain.com/api/paymob-webhook`

---

## 🏗️ Production Implementation

For production, you need a **backend server** to handle Paymob API calls securely:

### Backend Flow:
```
1. Customer clicks "Pay with Paymob"
2. Frontend → Your Backend API
3. Backend → Paymob API (Authenticate)
4. Backend → Paymob API (Create Order)
5. Backend → Paymob API (Generate Payment Token)
6. Backend → Frontend (Return iframe URL)
7. Frontend displays Paymob iframe
8. Customer completes payment
9. Paymob → Backend Webhook (Payment confirmation)
10. Backend → Update order status
```

### Required Backend Endpoints:

#### 1. **Authentication** (Get Token)
```
POST https://accept.paymob.com/api/auth/tokens
Body: { "api_key": "YOUR_API_KEY" }
Response: { "token": "AUTH_TOKEN" }
```

#### 2. **Create Order**
```
POST https://accept.paymob.com/api/ecommerce/orders
Headers: { "Authorization": "Bearer AUTH_TOKEN" }
Body: {
  "merchant_order_id": "WES123456",
  "amount_cents": 12000, // 120 EGP = 12000 cents
  "currency": "EGP",
  "items": [...]
}
Response: { "id": ORDER_ID }
```

#### 3. **Generate Payment Token**
```
POST https://accept.paymob.com/api/acceptance/payment_keys
Body: {
  "auth_token": "AUTH_TOKEN",
  "amount_cents": 12000,
  "expiration": 3600,
  "order_id": ORDER_ID,
  "billing_data": {...},
  "currency": "EGP",
  "integration_id": YOUR_INTEGRATION_ID
}
Response: { "token": "PAYMENT_TOKEN" }
```

#### 4. **iFrame URL**
```
https://accept.paymob.com/api/acceptance/iframes/YOUR_IFRAME_ID?payment_token=PAYMENT_TOKEN
```

---

## 📚 Useful Resources

- **Paymob Documentation**: [https://docs.paymob.com](https://docs.paymob.com)
- **API Reference**: [https://docs.paymob.com/docs/accept-standard-redirect](https://docs.paymob.com/docs/accept-standard-redirect)
- **Support**: [https://accept.paymob.com/portal2/en/support](https://accept.paymob.com/portal2/en/support)
- **WhatsApp Support**: +20 1000050699

---

## 🔒 Security Notes

⚠️ **IMPORTANT**:
- **NEVER** expose your API Key in frontend code
- Always use a backend server for API calls
- Store API keys in environment variables
- Use HTTPS for all communications
- Validate webhook signatures
- Test in sandbox mode before going live

---

## 🧪 Testing Mode

Paymob provides test cards for development:

### Test Card Numbers:
- **Visa**: `4987654321098769`
- **Mastercard**: `5123456789012346`
- **CVV**: Any 3 digits
- **Expiry**: Any future date

---

## 💰 Fees & Pricing

Paymob charges:
- **2.5% + 1 EGP** per transaction (for cards)
- **1.5%** for mobile wallets
- **3 EGP** for Fawry

Check [Paymob Pricing](https://paymob.com/pricing) for latest fees.

---

## ✅ Checklist

- [ ] Created Paymob account
- [ ] Verified email and phone
- [ ] Got API Key
- [ ] Got Integration ID
- [ ] Got iFrame ID
- [ ] Updated `script.js` with credentials
- [ ] Tested with test cards
- [ ] Setup webhook (optional)
- [ ] Ready for production! 🎉

---

## 🆘 Need Help?

If you encounter any issues:
1. Check Paymob documentation
2. Contact Paymob support
3. Join Paymob developers community
4. Refer to this guide

---

**Last Updated**: November 17, 2025
**Version**: 1.0

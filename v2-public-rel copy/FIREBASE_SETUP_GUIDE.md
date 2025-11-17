# 🔥 دليل إعداد Firebase - خطوة بخطوة

## 📱 الخطوة 1: إنشاء مشروع Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اضغط على **"Add project"** أو **"إضافة مشروع"**
3. اسم المشروع: `wesaya-orders` (أو أي اسم تريده)
4. اضغط **Continue** → **Continue** → **Create project**
5. انتظر حتى ينتهي الإنشاء ثم اضغط **Continue**

---

## ⚙️ الخطوة 2: إعداد Realtime Database

1. من القائمة الجانبية، اختر **"Build"** → **"Realtime Database"**
2. اضغط على **"Create Database"**
3. اختر **Location**: اختر أقرب موقع لك (مثلاً: `europe-west1`)
4. اختر **Security rules**: 
   - في البداية اختر **"Start in test mode"** (للتجربة)
   - ⚠️ **مهم جداً:** بعد ما تخلص تجربة، غيّر القواعد للأمان
5. اضغط **Enable**

---

## 🔑 الخطوة 3: الحصول على مفاتيح Firebase

### 3.1 - اذهب لإعدادات المشروع
1. اضغط على ⚙️ (الترس) بجانب **Project Overview**
2. اختر **"Project settings"** (إعدادات المشروع)
3. اسكرول لتحت حتى تلاقي **"Your apps"**

### 3.2 - إنشاء تطبيق ويب
1. اضغط على أيقونة **Web** (</>) تحت "Your apps"
2. **App nickname**: `Wesaya Website`
3. ✅ فعّل **"Also set up Firebase Hosting"** (اختياري)
4. اضغط **Register app**

### 3.3 - نسخ معلومات Firebase Config
سيظهر لك كود مثل هذا:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "wesaya-orders.firebaseapp.com",
  databaseURL: "https://wesaya-orders-default-rtdb.firebaseio.com",
  projectId: "wesaya-orders",
  storageBucket: "wesaya-orders.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**انسخ هذا الكود كامل!** 📋

---

## 📝 الخطوة 4: تحديث الكود

### 4.1 - تحديث `admin-script.js`
افتح `/workspaces/wesaya-demo/v2-public-rel copy/admin-script.js`

ابحث عن:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    ...
};
```

**استبدله بالكود اللي نسخته من Firebase!**

### 4.2 - تحديث `script.js`
افتح `/workspaces/wesaya-demo/v2-public-rel copy/script.js`

ابحث عن نفس الـ `firebaseConfig` واستبدله بنفس الكود.

---

## 🔒 الخطوة 5: ضبط قواعد الأمان (مهم!)

بعد ما تخلص تجربة، ارجع لـ **Realtime Database** في Firebase Console:

1. اضغط على تاب **"Rules"**
2. استبدل القواعد بالكود ده:

```json
{
  "rules": {
    "orders": {
      ".read": "auth != null",
      ".write": true,
      "$orderId": {
        ".read": "auth != null",
        ".write": true
      }
    }
  }
}
```

**ملاحظة:** القواعد دي تسمح بالكتابة للجميع (عشان العملاء يقدروا يضيفوا أوردرات)، لكن القراءة محمية.

**للحماية الأفضل:** استخدم Firebase Authentication.

3. اضغط **Publish**

---

## ✅ الخطوة 6: اختبار النظام

### اختبار إضافة أوردر:
1. افتح موقعك: `index.html`
2. أضف منتجات للسلة
3. اختر الدفع بـ Paymob
4. أكمل الدفع (اختر "Authentication Successful")
5. انتظر رسالة النجاح

### اختبار Dashboard:
1. افتح: `admin-login.html`
2. **Username:** `Worker`
3. **Password:** `wesayaorederviwer`
4. اضغط تسجيل الدخول
5. **يجب أن يظهر الأوردر اللي عملته! 🎉**

---

## 🎯 التأكد من عمل Firebase

### طريقة 1: من Firebase Console
1. اذهب لـ **Realtime Database**
2. يجب أن ترى:
```
orders
  ├── -Nabcdef123456
  │   ├── orderId: "WES12345678"
  │   ├── customerInfo: {...}
  │   ├── cart: [...]
  │   ├── amount: 205
  │   ├── status: "new"
  │   └── timestamp: "2025-11-17..."
```

### طريقة 2: من Browser Console
افتح Developer Tools (F12) واكتب:
```javascript
firebase.database().ref('orders').once('value', snap => {
    console.log('Firebase Orders:', snap.val());
});
```

يجب أن يظهر كل الأوردرات!

---

## 🔧 حل المشاكل الشائعة

### ❌ Error: "Permission denied"
**الحل:** راجع قواعد الأمان في الخطوة 5

### ❌ Error: "Firebase not initialized"
**الحل:** تأكد إنك ضفت Firebase SDK في `index.html`:
```html
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js"></script>
```

### ❌ الأوردر مش ظاهر في Dashboard
**الحل:** 
1. تأكد إن `firebaseConfig` متطابق في الملفين
2. افتح Browser Console وشوف الأخطاء
3. تأكد إنك ضفت الأوردر فعلاً (راجع Firebase Console)

### ❌ Error: "databaseURL is required"
**الحل:** تأكد إن `databaseURL` موجود في `firebaseConfig`

---

## 🌟 مميزات إضافية (اختياري)

### تفعيل Firebase Authentication:
1. من Firebase Console → **Authentication**
2. **Get started** → **Sign-in method**
3. فعّل **Anonymous**
4. ده هيزود الأمان أكتر

### عمل Backup للبيانات:
1. **Realtime Database** → تاب **Data**
2. اضغط **⋮** (ثلاث نقاط)
3. اختر **Export JSON**
4. احفظ الملف كباك أب

---

## 📞 الدعم

لو واجهتك أي مشكلة:
1. شيك Firebase Console → **Functions** logs
2. شوف Browser Console (F12)
3. تأكد من إعدادات الشبكة (CORS)

---

## ✨ النتيجة النهائية:

✅ لما العميل يدفع → الأوردر يتسجل في Firebase فوراً
✅ Dashboard يعرض الأوردرات Real-time (بدون تحديث)
✅ صوت تنبيه لما يجي أوردر جديد 🔔
✅ إمكانية تغيير حالة الأوردر
✅ طباعة الأوردر
✅ إحصائيات المبيعات

---

**🎉 مبروك! نظامك جاهز للاستخدام!**

**Last Updated:** November 17, 2025

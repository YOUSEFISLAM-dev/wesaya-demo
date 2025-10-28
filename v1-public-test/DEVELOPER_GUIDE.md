# دليل المطور - Wesaya Restaurant Developer Guide

## 📁 هيكل المشروع

```
wesaya/
├── index.html              # الصفحة الرئيسية
├── styles.css              # التنسيقات الشاملة (2254 سطر)
├── script.js               # السكريبت الرئيسي (السلة، PWA، العملاء)
├── menu-data.js            # بيانات القائمة الكاملة (82+ منتج)
├── generate-menu.js        # توليد القائمة ديناميكياً من البيانات
├── service-worker.js       # Service Worker للعمل بدون إنترنت
├── manifest.json           # بيانات PWA
├── restaurant-info.json    # معلومات المطعم (JSON)
├── README.md               # دليل المستخدم
├── CHANGELOG.md            # سجل التغييرات
└── DEVELOPER_GUIDE.md      # هذا الملف
```

## 🔧 البنية التقنية

### 1. بيانات القائمة (`menu-data.js`)

```javascript
const menuData = {
    categories: [...],  // 8 فئات
    contact: {...},     // معلومات الاتصال
    discount: {...}     // العروض الخاصة
};
```

**الفئات:**
- `id`: معرف فريد للفئة
- `name`: الاسم بالعربية
- `icon`: أيقونة Font Awesome
- `items`: مصفوفة المنتجات

**المنتجات:**
- `name`: اسم المنتج
- `price`: السعر (نص - يدعم النطاقات مثل "40.00 - 55.00")
- `img`: رابط الصورة من CDN
- `desc`: الوصف (اختياري)

### 2. توليد القائمة (`generate-menu.js`)

**الوظائف الرئيسية:**

```javascript
// توليد القائمة
generateMenu()

// ربط أحداث القائمة
attachMenuEventListeners()

// تحديث معلومات الاتصال
updateContactInfo()
```

**كيفية العمل:**
1. قراءة البيانات من `menuData`
2. توليد HTML ديناميكياً
3. إضافة المنتجات لمصفوفة `allProducts` للبحث
4. ربط الأحداث (الفلاتر، إضافة للسلة)

### 3. Service Worker (`service-worker.js`)

**استراتيجيات التخزين:**

```javascript
// الصور - Cache First
cacheFirst(request)

// الموارد الخارجية - Network First
networkFirst(request)
```

**الملفات المخزنة:**
- `./` - الصفحة الرئيسية
- `index.html`
- `styles.css`
- `script.js`
- `menu-data.js`
- `generate-menu.js`
- `manifest.json`
- خطوط Google Fonts
- Font Awesome

### 4. نظام السلة (`script.js`)

**التخزين المحلي:**

```javascript
localStorage.setItem('wesayaCart', JSON.stringify(cart));
localStorage.setItem('wesayaFavorites', JSON.stringify(favorites));
localStorage.setItem('wesayaCustomerInfo', JSON.stringify(customerInfo));
localStorage.setItem('wesayaPendingOrders', JSON.stringify(pendingOrders));
```

**الوظائف:**
- `addToCart(name, price)` - إضافة للسلة
- `removeFromCart(name)` - حذف من السلة
- `updateCartUI()` - تحديث الواجهة
- `calculateTotal()` - حساب المجموع

## 🎨 التخصيص

### تغيير الألوان

في `styles.css`:

```css
:root {
    --primary-color: #e74c3c;    /* اللون الأساسي */
    --secondary-color: #3498db;   /* اللون الثانوي */
    --accent-color: #f39c12;      /* لون التمييز */
    --text-dark: #2c3e50;         /* نص داكن */
    --text-light: #7f8c8d;        /* نص فاتح */
}
```

### إضافة فئة جديدة

في `menu-data.js`:

```javascript
menuData.categories.push({
    id: 'newCategory',
    name: 'فئة جديدة',
    icon: 'fa-icon-name',
    items: [
        {
            name: 'منتج جديد',
            price: '50.00',
            img: 'https://...',
            desc: 'وصف المنتج'
        }
    ]
});
```

### تحديث معلومات الاتصال

في `menu-data.js`:

```javascript
menuData.contact = {
    phone: '01007636312',
    email: 'Wesaya@getorder.net',
    facebook: 'Wesaya - وصاية',
    instagram: 'Wesaya - وصاية'
};
```

## 📱 PWA Configuration

### تحديث `manifest.json`

```json
{
  "name": "Wesaya Restaurant",
  "short_name": "Wesaya",
  "theme_color": "#e74c3c",
  "background_color": "#ffffff",
  "icons": [...]
}
```

### تحديث Service Worker Version

عند إجراء تغييرات، قم بتحديث الإصدار:

```javascript
const CACHE_NAME = 'wesaya-v1.0.4'; // زيادة رقم الإصدار
```

## 🔍 البحث والفلترة

### البحث

```javascript
// البحث في جميع المنتجات
allProducts.filter(product => 
    product.name.includes(searchQuery) ||
    product.description.includes(searchQuery)
);
```

### الفلترة

```javascript
// الفلترة حسب الفئة
document.querySelectorAll('.menu-item').forEach(item => {
    if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
    }
});
```

## 🚀 النشر

### 1. اختبار محلي

```bash
python -m http.server 8000
# افتح http://localhost:8000
```

### 2. التحقق من Service Worker

1. افتح DevTools (F12)
2. Application > Service Workers
3. تأكد من التسجيل الناجح

### 3. اختبار PWA

1. Lighthouse في Chrome DevTools
2. تحقق من النتيجة (يجب أن تكون 90+)

### 4. النشر على الإنتاج

```bash
# رفع الملفات على الخادم
# تأكد من HTTPS (مطلوب للـ PWA)
```

## 🐛 استكشاف الأخطاء

### Service Worker لا يعمل

```javascript
// في Console
navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(r => r.unregister());
});
// ثم أعد تحميل الصفحة
```

### البيانات لا تظهر

```javascript
// تحقق من تحميل menu-data.js
console.log(menuData);

// تحقق من توليد القائمة
console.log(allProducts);
```

### السلة لا تحفظ

```javascript
// تحقق من localStorage
console.log(localStorage.getItem('wesayaCart'));
```

## 📊 الأداء

### تحسين الصور

- استخدم WebP للصور
- قم بضغط الصور قبل الرفع
- استخدم lazy loading

### تحسين الكود

- قلل من عدد طلبات HTTP
- استخدم minification للـ CSS و JS
- فعّل GZIP على الخادم

## 🔐 الأمان

### HTTPS

- ضروري لعمل PWA
- ضروري لعمل Service Worker
- ضروري لـ geolocation API

### التحقق من البيانات

```javascript
// التحقق من رقم الهاتف
const phonePattern = /^[0-9]{11}$/;
if (!phonePattern.test(phone)) {
    alert('رقم هاتف غير صحيح');
}
```

## 📞 الدعم

للمساعدة أو الاستفسارات:
- **البريد:** Wesaya@getorder.net
- **الهاتف:** 01007636312

---

© 2025 Wesaya - وصاية. جميع الحقوق محفوظة.

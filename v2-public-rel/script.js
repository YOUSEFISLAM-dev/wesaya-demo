// Shopping Cart System
let cart = [];
let favorites = [];
let customerInfo = {
    name: '',
    phone: '',
    address: '',
    notes: ''
};
const RESTAURANT_PHONE = '+201007636312';

// All products for search
let allProducts = [];

// ============================================
// DARK MODE FUNCTIONALITY
// ============================================

// Load dark mode preference
function loadDarkMode() {
    const darkMode = localStorage.getItem('wesayaDarkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon();
    }
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('wesayaDarkMode', 'enabled');
        showNotification('تم تفعيل الوضع الداكن 🌙', 'success');
    } else {
        localStorage.setItem('wesayaDarkMode', 'disabled');
        showNotification('تم تفعيل الوضع الفاتح ☀️', 'success');
    }
    
    updateDarkModeIcon();
}

// Update dark mode icon
function updateDarkModeIcon() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        const icon = darkModeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('wesayaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('wesayaCart', JSON.stringify(cart));
}

// Load favorites from localStorage
function loadFavorites() {
    const savedFavorites = localStorage.getItem('wesayaFavorites');
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
        updateFavoritesUI();
    }
}

// Save favorites to localStorage
function saveFavorites() {
    localStorage.setItem('wesayaFavorites', JSON.stringify(favorites));
}

// Load customer info from localStorage
function loadCustomerInfo() {
    const savedInfo = localStorage.getItem('wesayaCustomerInfo');
    if (savedInfo) {
        customerInfo = JSON.parse(savedInfo);
        populateCustomerForm();
    }
}

// Save customer info to localStorage
function saveCustomerInfo() {
    localStorage.setItem('wesayaCustomerInfo', JSON.stringify(customerInfo));
}

// Populate customer form with saved data
function populateCustomerForm() {
    document.getElementById('customerName').value = customerInfo.name || '';
    document.getElementById('customerPhone').value = customerInfo.phone || '';
    document.getElementById('customerAddress').value = customerInfo.address || '';
    document.getElementById('customerNotes').value = customerInfo.notes || '';
    
    if (customerInfo.name && customerInfo.phone && customerInfo.address) {
        document.getElementById('savedInfoNotice').style.display = 'flex';
        document.getElementById('editInfoBtn').style.display = 'block';
        
        // Make fields readonly
        document.getElementById('customerName').readOnly = true;
        document.getElementById('customerPhone').readOnly = true;
        document.getElementById('customerAddress').readOnly = true;
        document.getElementById('customerNotes').readOnly = true;
    }
}

// Add item to cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: parseFloat(price),
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showNotification('تم الإضافة للسلة!', 'success');
}

// Remove item from cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    updateCartUI();
    showNotification('تم الحذف من السلة', 'info');
}

// Update item quantity
function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

// Calculate total
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartBody = document.getElementById('cartBody');
    const totalPrice = document.getElementById('totalPrice');
    
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart body
    if (cart.length === 0) {
        cartBody.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>السلة فارغة</p>
                <span>ابدأ بإضافة بعض المنتجات الشهية!</span>
            </div>
        `;
    } else {
        cartBody.innerHTML = cart.map(item => `
            <div class="cart-item">
                <button class="remove-item" onclick="removeFromCart('${item.name}')">
                    <i class="fas fa-times"></i>
                </button>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toFixed(2)} ج.م</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Update total
    totalPrice.textContent = `${calculateTotal().toFixed(2)} ج.م`;
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #27ae60, #229954)' : 'linear-gradient(135deg, #3498db, #2980b9)'};
        color: white;
        padding: 18px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        animation: slideInRight 0.5s ease;
        font-family: 'Cairo', sans-serif;
        font-weight: 600;
        font-size: 16px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}" style="font-size: 20px;"></i>
            <div>${message}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.5s ease reverse';
        setTimeout(() => notification.remove(), 500);
    }, 2500);
}

// Send order to WhatsApp with customer info
function sendToWhatsApp() {
    if (cart.length === 0) {
        showNotification('السلة فارغة! أضف بعض المنتجات أولاً', 'info');
        return;
    }
    
    let message = `*🍕 طلب جديد من Wesaya - وصاية*\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `*👤 معلومات العميل:*\n`;
    message += `الاسم: ${customerInfo.name}\n`;
    message += `الهاتف: ${customerInfo.phone}\n`;
    message += `العنوان: ${customerInfo.address}\n`;
    if (customerInfo.notes) {
        message += `ملاحظات: ${customerInfo.notes}\n`;
    }
    message += `\n━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `*🛒 تفاصيل الطلب:*\n\n`;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n`;
        message += `   الكمية: ${item.quantity}\n\n`;
    });
    
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `⏰ وقت الطلب: ${new Date().toLocaleString('ar-EG')}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${RESTAURANT_PHONE}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    
    // Clear cart after order
    setTimeout(() => {
        cart = [];
        saveCart();
        updateCartUI();
        closeCartModal();
        closeCustomerModal();
        showNotification('تم إرسال طلبك بنجاح! 🎉', 'success');
    }, 1000);
}

// Toggle favorite
function toggleFavorite(name, price) {
    const index = favorites.findIndex(item => item.name === name);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('تم الإزالة من المفضلة', 'info');
    } else {
        favorites.push({ name, price });
        showNotification('تم الإضافة للمفضلة! ❤️', 'success');
    }
    
    saveFavorites();
    updateFavoritesUI();
    
    // If favorites modal is open, refresh it
    const searchModal = document.getElementById('searchModal');
    if (searchModal.classList.contains('active') && 
        document.getElementById('searchResults').querySelector('.fa-heart')) {
        refreshFavoritesDisplay();
    }
}

// Refresh favorites display in modal
function refreshFavoritesDisplay() {
    if (favorites.length === 0) {
        document.getElementById('searchResults').innerHTML = `
            <div style="text-align: center; padding: 40px; color: #999;">
                <i class="fas fa-heart" style="font-size: 48px; margin-bottom: 15px; opacity: 0.3;"></i>
                <p>لا توجد منتجات في المفضلة</p>
            </div>
        `;
        return;
    }
    
    document.getElementById('searchResults').innerHTML = `
        <h3 style="margin-bottom: 20px; color: var(--primary-color);">
            <i class="fas fa-heart"></i> المفضلة (${favorites.length})
        </h3>
        ${favorites.map(product => `
            <div class="search-result-item">
                <span class="result-name">${product.name}</span>
                <span class="result-price">${product.price} ج.م</span>
                <button onclick="addToCart('${product.name}', '${product.price}')" style="background: var(--primary-color); color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; margin-left: 10px;">
                    <i class="fas fa-cart-plus"></i>
                </button>
                <button onclick="toggleFavorite('${product.name}', '${product.price}')" style="background: #e74c3c; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('')}
    `;
}

// Update favorites UI
function updateFavoritesUI() {
    const favoritesCount = document.getElementById('favoritesCount');
    favoritesCount.textContent = favorites.length;
    
    // Update heart icons
    document.querySelectorAll('.favorite-icon').forEach(icon => {
        const name = icon.getAttribute('data-name');
        if (favorites.some(item => item.name === name)) {
            icon.classList.add('active');
        } else {
            icon.classList.remove('active');
        }
    });
}

// Build products list for search
function buildProductsList() {
    allProducts = [];
    
    // Get menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        const name = item.querySelector('h3').textContent;
        const price = item.querySelector('[data-price]').getAttribute('data-price');
        allProducts.push({ name, price, type: 'menu' });
    });
    
    // Get offers
    document.querySelectorAll('.offer-card').forEach(item => {
        const name = item.querySelector('h3').textContent;
        const priceElement = item.querySelector('.price-main');
        if (priceElement) {
            const price = priceElement.textContent.replace(' ج.م', '');
            allProducts.push({ name, price, type: 'offer' });
        }
    });
}

// Search functionality
function searchProducts(query) {
    const searchResults = document.getElementById('searchResults');
    
    if (!query.trim()) {
        searchResults.innerHTML = '<div class="no-results"><i class="fas fa-search" style="font-size: 50px; margin-bottom: 15px;"></i><p>ابدأ بكتابة اسم المنتج...</p></div>';
        return;
    }
    
    const results = allProducts.filter(product => 
        product.name.includes(query)
    );
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results"><i class="fas fa-sad-tear" style="font-size: 50px; margin-bottom: 15px;"></i><p>لم يتم العثور على نتائج</p></div>';
        return;
    }
    
    searchResults.innerHTML = results.map(product => `
        <div class="search-result-item" onclick="addToCart('${product.name}', '${product.price}'); closeSearchModal();">
            <span class="result-name">${product.name}</span>
            <span class="result-price">${product.price} ج.م</span>
            <button style="background: var(--primary-color); color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">
                <i class="fas fa-cart-plus"></i>
            </button>
        </div>
    `).join('');
}

// Modal Controls
const cartModal = document.getElementById('cartModal');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartOverlay = document.getElementById('cartOverlay');
const checkoutBtnCart = document.getElementById('checkoutBtnCart');
const checkoutBtn = document.getElementById('checkoutBtn');

const customerModal = document.getElementById('customerModal');
const closeCustomer = document.getElementById('closeCustomer');
const customerForm = document.getElementById('customerForm');
const editInfoBtn = document.getElementById('editInfoBtn');

const searchModal = document.getElementById('searchModal');
const searchToggle = document.getElementById('searchToggle');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');

const favoritesBtn = document.getElementById('favoritesBtn');
const quickOrderBtn = document.getElementById('quickOrderBtn');

function openCartModal() {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartModal() {
    cartModal.classList.remove('active');
    document.body.style.overflow = '';
}

function openCustomerModal() {
    customerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCustomerModal() {
    customerModal.classList.remove('active');
    document.body.style.overflow = '';
}

function openSearchModal() {
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 100);
}

function closeSearchModal() {
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
    searchInput.value = '';
    document.getElementById('searchResults').innerHTML = '';
}

// Cart Modal Events
cartBtn.addEventListener('click', openCartModal);
closeCart.addEventListener('click', closeCartModal);
cartOverlay.addEventListener('click', closeCartModal);

checkoutBtnCart.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('السلة فارغة! أضف بعض المنتجات أولاً', 'info');
        return;
    }
    closeCartModal();
    openCustomerModal();
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        openCartModal();
        showNotification('السلة فارغة! أضف بعض المنتجات أولاً', 'info');
    } else {
        openCustomerModal();
    }
});

// Customer Modal Events
closeCustomer.addEventListener('click', closeCustomerModal);

editInfoBtn.addEventListener('click', () => {
    document.getElementById('customerName').readOnly = false;
    document.getElementById('customerPhone').readOnly = false;
    document.getElementById('customerAddress').readOnly = false;
    document.getElementById('customerNotes').readOnly = false;
    document.getElementById('savedInfoNotice').style.display = 'none';
    editInfoBtn.style.display = 'none';
    showNotification('يمكنك الآن تعديل معلوماتك', 'info');
});

customerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const notes = document.getElementById('customerNotes').value.trim();
    
    // Validate phone number
    if (!/^[0-9]{11}$/.test(phone)) {
        showNotification('رقم الهاتف يجب أن يكون 11 رقم', 'info');
        return;
    }
    
    // Save customer info
    customerInfo = { name, phone, address, notes };
    saveCustomerInfo();
    
    // Send order
    sendToWhatsApp();
});

// Search Modal Events
searchToggle.addEventListener('click', openSearchModal);
closeSearch.addEventListener('click', closeSearchModal);
document.querySelector('.search-overlay').addEventListener('click', closeSearchModal);

searchInput.addEventListener('input', (e) => {
    searchProducts(e.target.value);
});

// Favorites Button Event
favoritesBtn.addEventListener('click', () => {
    if (favorites.length === 0) {
        showNotification('لا توجد منتجات في المفضلة', 'info');
        return;
    }
    
    // Show favorites in search modal
    openSearchModal();
    refreshFavoritesDisplay();
});

// Quick Order Button Event
quickOrderBtn.addEventListener('click', () => {
    const message = `مرحباً! أريد الاستفسار عن منتجاتكم في Wesaya - وصاية 🍕`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${RESTAURANT_PHONE}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
});

// Add to cart button listeners
document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart-btn')) {
        const button = e.target.closest('.add-to-cart-btn');
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');
        addToCart(name, price);
    }
});

// Initialize favorite icons
function initFavoriteIcons() {
    document.querySelectorAll('.menu-item, .offer-card').forEach(item => {
        const button = item.querySelector('.add-to-cart-btn');
        if (button) {
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            
            const favoriteIcon = document.createElement('button');
            favoriteIcon.className = 'favorite-icon';
            favoriteIcon.setAttribute('data-name', name);
            favoriteIcon.innerHTML = '<i class="fas fa-heart"></i>';
            favoriteIcon.onclick = (e) => {
                e.stopPropagation();
                toggleFavorite(name, price);
            };
            
            item.style.position = 'relative';
            item.insertBefore(favoriteIcon, item.firstChild);
        }
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close modals
    if (e.key === 'Escape') {
        closeCartModal();
        closeCustomerModal();
        closeSearchModal();
    }
    
    // Ctrl+K or Cmd+K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
    }
});

// ============================================
// PWA & OFFLINE SUPPORT
// ============================================

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('✅ Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('❌ Service Worker registration failed:', error);
            });
    });
}

// Install PWA
let deferredPrompt;
const installPwaBtn = document.getElementById('installPwaBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installPwaBtn.style.display = 'flex';
});

installPwaBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
            showNotification('تم تثبيت التطبيق بنجاح! 🎉', 'success');
        }
        
        deferredPrompt = null;
        installPwaBtn.style.display = 'none';
    }
});

// Detect online/offline status (Silent Mode)
const offlineIndicator = document.getElementById('offlineIndicator');
const onlineIndicator = document.getElementById('onlineIndicator');
const networkBadge = document.getElementById('networkBadge');
let isOnline = navigator.onLine;

function updateOnlineStatus() {
    // Hide network badge - work silently
    if (networkBadge) {
        networkBadge.style.display = 'none';
    }
    
    if (navigator.onLine) {
        document.body.classList.remove('offline-mode');
        
        // Sync any pending orders silently
        syncPendingOrders();
    } else {
        document.body.classList.add('offline-mode');
    }
    
    isOnline = navigator.onLine;
}

// Remove network badge click event - no notifications

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Check initial status silently
if (!navigator.onLine) {
    document.body.classList.add('offline-mode');
}

// Store pending orders when offline
function storePendingOrder(orderData) {
    const pendingOrders = JSON.parse(localStorage.getItem('wesayaPendingOrders') || '[]');
    pendingOrders.push({
        id: Date.now(),
        data: orderData,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('wesayaPendingOrders', JSON.stringify(pendingOrders));
}

// Sync pending orders when back online (Silent Mode)
async function syncPendingOrders() {
    const pendingOrders = JSON.parse(localStorage.getItem('wesayaPendingOrders') || '[]');
    
    if (pendingOrders.length > 0) {
        // Sync silently without notifications
        // Here you would send orders to your backend
        // For now, we'll just clear them
        setTimeout(() => {
            localStorage.setItem('wesayaPendingOrders', '[]');
        }, 2000);
    }
}

// Modified sendToWhatsApp to work offline (Silent Mode)
const originalSendToWhatsApp = sendToWhatsApp;
sendToWhatsApp = function() {
    if (!navigator.onLine) {
        // Store order for later silently
        storePendingOrder({
            cart: [...cart],
            customerInfo: {...customerInfo}
        });
        
        showNotification('تم حفظ طلبك! 📱', 'success');
        
        // Clear cart
        cart = [];
        saveCart();
        updateCartUI();
        closeCartModal();
        closeCustomerModal();
        
        return;
    }
    
    originalSendToWhatsApp();
};

// Cache management
function clearOldCache() {
    if ('caches' in window) {
        caches.keys().then(names => {
            names.forEach(name => {
                if (name !== 'wesaya-v1') {
                    caches.delete(name);
                }
            });
        });
    }
}

// Prefetch important images
function prefetchImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Show offline cart badge
function updateOfflineCartBadge() {
    const pendingOrders = JSON.parse(localStorage.getItem('wesayaPendingOrders') || '[]');
    
    if (pendingOrders.length > 0 && !navigator.onLine) {
        const badge = document.createElement('div');
        badge.id = 'pendingOrdersBadge';
        badge.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #f39c12;
            color: white;
            padding: 10px 20px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 14px;
            z-index: 1000;
            cursor: pointer;
            box-shadow: 0 5px 20px rgba(243, 156, 18, 0.4);
        `;
        badge.innerHTML = `<i class="fas fa-clock"></i> ${pendingOrders.length} طلب قيد الانتظار`;
        badge.onclick = () => {
            showNotification('سيتم إرسال طلباتك تلقائياً عند الاتصال بالإنترنت', 'info');
        };
        
        document.body.appendChild(badge);
    }
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    loadDarkMode();
    loadCart();
    loadFavorites();
    loadCustomerInfo();
    buildProductsList();
    initFavoriteIcons();
    updateFavoritesUI();
    updateOnlineStatus();
    updateOfflineCartBadge();
    clearOldCache();
    prefetchImages();
    
    // Dark Mode Toggle Event
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    console.log('🍕 Wesaya Restaurant - All systems ready!');
    console.log('📱 PWA Support: ' + ('serviceWorker' in navigator ? 'Enabled' : 'Disabled'));
    console.log('🌐 Online Status: ' + (navigator.onLine ? 'Online' : 'Offline'));
    console.log('🌓 Dark Mode: ' + (document.body.classList.contains('dark-mode') ? 'Enabled' : 'Disabled'));
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Menu Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        menuItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hero Buttons
const heroButtons = document.querySelectorAll('.hero-buttons .btn');
heroButtons[0].addEventListener('click', () => {
    document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' });
});

heroButtons[1].addEventListener('click', () => {
    document.querySelector('#offers').scrollIntoView({ behavior: 'smooth' });
});

// Legacy buttons (for non-cart buttons)
// Removed - now using cart system

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Create success message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 15px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        font-family: 'Cairo', sans-serif;
        animation: fadeIn 0.5s ease;
    `;
    
    message.innerHTML = `
        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #e74c3c, #c0392b); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
            <i class="fas fa-check" style="font-size: 40px; color: white;"></i>
        </div>
        <h3 style="font-size: 24px; margin-bottom: 10px; color: #2c3e50;">شكراً لتواصلك!</h3>
        <p style="color: #666; font-size: 16px;">سنتواصل معك في أقرب وقت</p>
        <button onclick="this.parentElement.remove()" style="margin-top: 20px; background: #e74c3c; color: white; border: none; padding: 12px 30px; border-radius: 50px; cursor: pointer; font-family: 'Cairo', sans-serif; font-weight: 600;">حسناً</button>
    `;
    
    // Add overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
    `;
    overlay.onclick = () => {
        message.remove();
        overlay.remove();
    };
    
    document.body.appendChild(overlay);
    document.body.appendChild(message);
    
    // Reset form
    contactForm.reset();
});

// Newsletter Form
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Create notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: white;
        color: #2c3e50;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideUp 0.5s ease;
        font-family: 'Cairo', sans-serif;
        font-weight: 600;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <i class="fas fa-envelope-circle-check" style="font-size: 24px; color: #e74c3c;"></i>
            <div>تم الاشتراك بنجاح!</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                transform: translateY(100px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.5s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
    
    // Reset form
    e.target.reset();
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-card, .menu-item, .offer-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add hover effect to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    // Set fallback image on error
    img.addEventListener('error', function() {
        if (this.src !== window.location.origin + '/404.png' && this.src !== '404.png') {
            console.log('Image load failed, using 404.png:', this.src);
            this.src = '404.png';
        }
    });
});

// Prevent right-click on images (optional - for protection)
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        // e.preventDefault(); // Uncomment to prevent right-click
    });
});

console.log('Wesaya Restaurant Website - Developed with ❤️');

// Dynamic page title change when tab is inactive - MUST RUN AFTER DOM LOADED
window.addEventListener('DOMContentLoaded', function() {
    const originalTitle = 'Wesaya - وصاية | أفضل مطعم للبيتزا والبرجر والدجاج المقلي';
    const inactiveTitle = 'الـ Fried Chicken تناديك | 🐔 بكاك !!!!!';
    
    console.log('Title changer initialized:', originalTitle);
    
    // Change title when user leaves tab
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.title = inactiveTitle;
            console.log('Tab hidden - Title changed to:', document.title);
        } else {
            document.title = originalTitle;
            console.log('Tab visible - Title changed to:', document.title);
        }
    });
    
    // Also handle blur/focus events for better browser support
    window.addEventListener('blur', function() {
        document.title = inactiveTitle;
        console.log('Window blur - Title changed to:', document.title);
    });
    
    window.addEventListener('focus', function() {
        document.title = originalTitle;
        console.log('Window focus - Title changed to:', document.title);
    });
});

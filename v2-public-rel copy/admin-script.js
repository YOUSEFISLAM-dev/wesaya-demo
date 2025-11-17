// Check authentication
if (sessionStorage.getItem('wesayaAdminAuth') !== 'true') {
    window.location.href = 'admin-login.html';
}

// Firebase Configuration
// TODO: Replace with your actual Firebase config
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const ordersRef = database.ref('orders');

// Global variables
let allOrders = [];
let currentFilter = 'all';
let soundEnabled = true;
let lastOrderCount = 0;

// Elements
const ordersGrid = document.getElementById('ordersGrid');
const emptyState = document.getElementById('emptyState');
const notificationSound = document.getElementById('notificationSound');
const filterButtons = document.querySelectorAll('.filter-btn');
const refreshBtn = document.getElementById('refreshBtn');
const soundToggle = document.getElementById('soundToggle');
const logoutBtn = document.getElementById('logoutBtn');
const orderModal = document.getElementById('orderModal');
const closeModal = document.getElementById('closeModal');

// Set current user
document.getElementById('currentUser').textContent = sessionStorage.getItem('wesayaAdminUser');

// Logout
logoutBtn.addEventListener('click', () => {
    if (confirm('هل تريد تسجيل الخروج؟')) {
        sessionStorage.removeItem('wesayaAdminAuth');
        sessionStorage.removeItem('wesayaAdminUser');
        window.location.href = 'admin-login.html';
    }
});

// Sound toggle
soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.innerHTML = soundEnabled 
        ? '<i class="fas fa-volume-up"></i> الصوت'
        : '<i class="fas fa-volume-mute"></i> الصوت';
    soundToggle.classList.toggle('muted');
});

// Filter buttons
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.status;
        renderOrders();
    });
});

// Refresh button
refreshBtn.addEventListener('click', () => {
    refreshBtn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> جاري التحديث...';
    setTimeout(() => {
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> تحديث';
    }, 1000);
});

// Close modal
closeModal.addEventListener('click', () => {
    orderModal.classList.remove('active');
});

orderModal.querySelector('.modal-overlay').addEventListener('click', () => {
    orderModal.classList.remove('active');
});

// Listen for new orders (Real-time)
ordersRef.on('value', (snapshot) => {
    const ordersData = snapshot.val();
    
    if (!ordersData) {
        allOrders = [];
        showEmptyState();
        updateStats();
        return;
    }
    
    // Convert to array
    allOrders = Object.keys(ordersData).map(key => ({
        id: key,
        ...ordersData[key]
    })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Check for new orders
    if (allOrders.length > lastOrderCount && lastOrderCount > 0) {
        playNotificationSound();
    }
    lastOrderCount = allOrders.length;
    
    hideEmptyState();
    renderOrders();
    updateStats();
});

// Render orders
function renderOrders() {
    const filteredOrders = currentFilter === 'all' 
        ? allOrders 
        : allOrders.filter(order => order.status === currentFilter);
    
    document.getElementById('ordersCount').textContent = filteredOrders.length;
    
    if (filteredOrders.length === 0) {
        showEmptyState();
        return;
    }
    
    hideEmptyState();
    
    ordersGrid.innerHTML = filteredOrders.map(order => createOrderCard(order)).join('');
    
    // Add event listeners
    attachOrderEventListeners();
}

// Create order card HTML
function createOrderCard(order) {
    const statusText = {
        'new': 'جديد',
        'preparing': 'قيد التحضير',
        'ready': 'جاهز للتوصيل',
        'delivered': 'تم التوصيل'
    };
    
    const isNew = order.status === 'new';
    
    return `
        <div class="order-card ${isNew ? 'new-order' : ''}" data-order-id="${order.id}">
            <div class="order-header">
                <div>
                    <div class="order-number">#${order.orderId}</div>
                    <div class="order-time">${formatTime(order.timestamp)}</div>
                </div>
                <div class="status-badge ${order.status}">
                    ${statusText[order.status]}
                </div>
            </div>
            <div class="order-body">
                <div class="customer-info">
                    <div class="info-row">
                        <i class="fas fa-user"></i>
                        <strong>الاسم:</strong>
                        <span>${order.customerInfo.name}</span>
                    </div>
                    <div class="info-row">
                        <i class="fas fa-phone"></i>
                        <strong>الهاتف:</strong>
                        <span>${order.customerInfo.phone}</span>
                    </div>
                    <div class="info-row">
                        <i class="fas fa-map-marker-alt"></i>
                        <strong>العنوان:</strong>
                        <span>${order.customerInfo.address}</span>
                    </div>
                </div>
                
                <div class="order-items">
                    <h4><i class="fas fa-shopping-basket"></i> المنتجات:</h4>
                    ${order.cart.slice(0, 3).map(item => `
                        <div class="item-row">
                            <span class="item-name">${item.name}</span>
                            <span class="item-quantity">x${item.quantity}</span>
                            <span class="item-price">${(item.price * item.quantity).toFixed(2)} ج.م</span>
                        </div>
                    `).join('')}
                    ${order.cart.length > 3 ? `<p style="color: #7f8c8d; font-size: 14px; margin-top: 10px;">+ ${order.cart.length - 3} منتجات أخرى</p>` : ''}
                </div>
                
                <div class="order-total">
                    <div class="total-row">
                        <strong>الإجمالي:</strong>
                        <span class="total-amount">${order.amount.toFixed(2)} ج.م</span>
                    </div>
                </div>
                
                <div class="order-actions">
                    <button class="order-btn btn-view" onclick="viewOrderDetails('${order.id}')">
                        <i class="fas fa-eye"></i> التفاصيل
                    </button>
                    <button class="order-btn btn-print" onclick="printOrder('${order.id}')">
                        <i class="fas fa-print"></i> طباعة
                    </button>
                    
                    ${order.status === 'new' ? `
                        <button class="order-btn btn-preparing" onclick="updateOrderStatus('${order.id}', 'preparing')">
                            <i class="fas fa-fire"></i> بدء التحضير
                        </button>
                    ` : ''}
                    
                    ${order.status === 'preparing' ? `
                        <button class="order-btn btn-ready" onclick="updateOrderStatus('${order.id}', 'ready')">
                            <i class="fas fa-check-circle"></i> جاهز
                        </button>
                    ` : ''}
                    
                    ${order.status === 'ready' ? `
                        <button class="order-btn btn-delivered" onclick="updateOrderStatus('${order.id}', 'delivered')">
                            <i class="fas fa-truck"></i> تم التوصيل
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// View order details
function viewOrderDetails(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div style="margin-bottom: 30px;">
            <h3 style="margin-bottom: 15px; color: #e74c3c;">
                <i class="fas fa-receipt"></i> رقم الطلب: #${order.orderId}
            </h3>
            <p style="color: #7f8c8d;">
                <i class="fas fa-clock"></i> ${formatFullTime(order.timestamp)}
            </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
            <h4 style="margin-bottom: 15px; color: #2c3e50;">
                <i class="fas fa-user-circle"></i> معلومات العميل:
            </h4>
            <div style="display: grid; gap: 12px;">
                <p><strong>الاسم:</strong> ${order.customerInfo.name}</p>
                <p><strong>الهاتف:</strong> ${order.customerInfo.phone}</p>
                <p><strong>العنوان:</strong> ${order.customerInfo.address}</p>
                ${order.customerInfo.notes ? `<p><strong>ملاحظات:</strong> ${order.customerInfo.notes}</p>` : ''}
            </div>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h4 style="margin-bottom: 15px; color: #2c3e50;">
                <i class="fas fa-shopping-basket"></i> تفاصيل المنتجات:
            </h4>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #f8f9fa;">
                        <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6;">المنتج</th>
                        <th style="padding: 12px; text-align: center; border-bottom: 2px solid #dee2e6;">الكمية</th>
                        <th style="padding: 12px; text-align: center; border-bottom: 2px solid #dee2e6;">السعر</th>
                        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">الإجمالي</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.cart.map(item => `
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #f1f3f5;">${item.name}</td>
                            <td style="padding: 12px; text-align: center; border-bottom: 1px solid #f1f3f5;">${item.quantity}</td>
                            <td style="padding: 12px; text-align: center; border-bottom: 1px solid #f1f3f5;">${item.price.toFixed(2)} ج.م</td>
                            <td style="padding: 12px; text-align: left; border-bottom: 1px solid #f1f3f5; font-weight: 700;">${(item.price * item.quantity).toFixed(2)} ج.م</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div style="background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; padding: 20px; border-radius: 10px; text-align: center;">
            <p style="font-size: 18px; margin-bottom: 5px;">المبلغ الإجمالي</p>
            <p style="font-size: 36px; font-weight: 900;">${order.amount.toFixed(2)} ج.م</p>
            <p style="font-size: 14px; opacity: 0.9; margin-top: 10px;">
                <i class="fas fa-check-circle"></i> تم الدفع عبر Paymob
            </p>
        </div>
    `;
    
    orderModal.classList.add('active');
}

// Print order
function printOrder(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;
    
    const printTemplate = document.getElementById('printTemplate');
    printTemplate.innerHTML = `
        <div style="padding: 40px; font-family: 'Cairo', sans-serif; max-width: 800px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #e74c3c; padding-bottom: 20px;">
                <h1 style="color: #e74c3c; font-size: 36px; margin-bottom: 10px;">Wesaya - وصاية</h1>
                <p style="font-size: 18px; color: #7f8c8d;">فاتورة طلب</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <p style="font-size: 16px; margin-bottom: 10px;"><strong>رقم الطلب:</strong> #${order.orderId}</p>
                        <p style="font-size: 14px; color: #7f8c8d;">${formatFullTime(order.timestamp)}</p>
                    </div>
                    <div style="text-align: left;">
                        <p style="font-size: 16px; margin-bottom: 10px;"><strong>الحالة:</strong> ${getStatusText(order.status)}</p>
                        <p style="font-size: 14px; color: #7f8c8d;">مدفوع - Paymob</p>
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 25px; padding: 20px; border: 2px solid #ecf0f1; border-radius: 10px;">
                <h3 style="color: #2c3e50; margin-bottom: 15px; font-size: 20px;">معلومات العميل:</h3>
                <p style="margin-bottom: 8px;"><strong>الاسم:</strong> ${order.customerInfo.name}</p>
                <p style="margin-bottom: 8px;"><strong>الهاتف:</strong> ${order.customerInfo.phone}</p>
                <p style="margin-bottom: 8px;"><strong>العنوان:</strong> ${order.customerInfo.address}</p>
                ${order.customerInfo.notes ? `<p><strong>ملاحظات:</strong> ${order.customerInfo.notes}</p>` : ''}
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                <thead>
                    <tr style="background: #e74c3c; color: white;">
                        <th style="padding: 15px; text-align: right;">المنتج</th>
                        <th style="padding: 15px; text-align: center;">الكمية</th>
                        <th style="padding: 15px; text-align: center;">السعر</th>
                        <th style="padding: 15px; text-align: left;">الإجمالي</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.cart.map((item, index) => `
                        <tr style="border-bottom: 1px solid #ecf0f1; background: ${index % 2 === 0 ? '#f8f9fa' : 'white'}">
                            <td style="padding: 12px;">${item.name}</td>
                            <td style="padding: 12px; text-align: center;">${item.quantity}</td>
                            <td style="padding: 12px; text-align: center;">${item.price.toFixed(2)} ج.م</td>
                            <td style="padding: 12px; text-align: left; font-weight: 700;">${(item.price * item.quantity).toFixed(2)} ج.م</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div style="text-align: left; padding: 20px; background: #e74c3c; color: white; border-radius: 10px;">
                <p style="font-size: 24px; font-weight: 700;">المجموع: ${order.amount.toFixed(2)} ج.م</p>
            </div>
            
            <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px dashed #ecf0f1; color: #7f8c8d;">
                <p>شكراً لطلبكم من Wesaya - وصاية</p>
                <p style="font-size: 14px; margin-top: 10px;">للاستفسارات: 01007636312</p>
            </div>
        </div>
    `;
    
    window.print();
}

// Update order status
function updateOrderStatus(orderId, newStatus) {
    const statusText = {
        'preparing': 'قيد التحضير',
        'ready': 'جاهز للتوصيل',
        'delivered': 'تم التوصيل'
    };
    
    if (confirm(`هل تريد تغيير حالة الطلب إلى "${statusText[newStatus]}"؟`)) {
        ordersRef.child(orderId).update({
            status: newStatus,
            lastUpdated: new Date().toISOString()
        }).then(() => {
            console.log('Order status updated successfully');
        }).catch((error) => {
            console.error('Error updating order:', error);
            alert('حدث خطأ في تحديث حالة الطلب');
        });
    }
}

// Update statistics
function updateStats() {
    const newOrders = allOrders.filter(o => o.status === 'new').length;
    const preparingOrders = allOrders.filter(o => o.status === 'preparing').length;
    const readyOrders = allOrders.filter(o => o.status === 'ready').length;
    
    // Calculate today's sales
    const today = new Date().toDateString();
    const todaySales = allOrders
        .filter(o => new Date(o.timestamp).toDateString() === today)
        .reduce((sum, o) => sum + o.amount, 0);
    
    document.getElementById('newOrdersCount').textContent = newOrders;
    document.getElementById('preparingOrdersCount').textContent = preparingOrders;
    document.getElementById('readyOrdersCount').textContent = readyOrders;
    document.getElementById('todaySales').textContent = `${todaySales.toFixed(2)} ج.م`;
}

// Helper functions
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60); // minutes
    
    if (diff < 1) return 'الآن';
    if (diff < 60) return `منذ ${diff} دقيقة`;
    if (diff < 1440) return `منذ ${Math.floor(diff / 60)} ساعة`;
    return date.toLocaleDateString('ar-EG');
}

function formatFullTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getStatusText(status) {
    const statusMap = {
        'new': 'جديد',
        'preparing': 'قيد التحضير',
        'ready': 'جاهز للتوصيل',
        'delivered': 'تم التوصيل'
    };
    return statusMap[status] || status;
}

function playNotificationSound() {
    if (soundEnabled) {
        notificationSound.play().catch(err => console.log('Sound play error:', err));
    }
}

function showEmptyState() {
    ordersGrid.style.display = 'none';
    emptyState.style.display = 'block';
}

function hideEmptyState() {
    ordersGrid.style.display = 'grid';
    emptyState.style.display = 'none';
}

function attachOrderEventListeners() {
    // Event listeners are attached via onclick in HTML
}

// Make functions global
window.viewOrderDetails = viewOrderDetails;
window.printOrder = printOrder;
window.updateOrderStatus = updateOrderStatus;

console.log('✅ Admin Dashboard loaded successfully');

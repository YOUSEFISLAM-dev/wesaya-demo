// Generate menu HTML from real data
function generateMenu() {
    const menuGrid = document.querySelector('.menu-grid');
    const menuFilters = document.querySelector('.menu-filters');
    
    if (!menuGrid) return;
    
    // Clear existing items
    menuGrid.innerHTML = '';
    
    // Generate filter buttons
    if (menuFilters) {
        let filtersHTML = '<button class="filter-btn active" data-filter="all">الكل</button>';
        menuData.categories.forEach(category => {
            filtersHTML += `<button class="filter-btn" data-filter="${category.id}">
                <i class="fas ${category.icon}"></i> ${category.name}
            </button>`;
        });
        menuFilters.innerHTML = filtersHTML;
    }
    
    // Generate menu items
    let itemsHTML = '';
    menuData.categories.forEach(category => {
        category.items.forEach(item => {
            // Handle price ranges
            let priceDisplay = item.price;
            let priceValue = item.price;
            if (item.price.includes(' - ')) {
                const prices = item.price.split(' - ');
                priceDisplay = `من ${prices[0]} ج.م`;
                priceValue = prices[0]; // Use lowest price for cart
            } else {
                priceDisplay = `${item.price} ج.م`;
            }
            
            // Use placeholder image if no image provided
            const imageUrl = item.img || 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(item.name);
            
            itemsHTML += `
                <div class="menu-item" data-category="${category.id}">
                    <div class="menu-item-image">
                        <img src="${imageUrl}" alt="${item.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(item.name)}'">
                        <div class="menu-item-overlay">
                            <button class="btn-add-cart" onclick="addToCart('${item.name.replace(/'/g, "\\'")}', '${priceValue}')">
                                <i class="fas fa-cart-plus"></i> أضف للسلة
                            </button>
                        </div>
                        <button class="favorite-btn" onclick="toggleFavorite('${item.name.replace(/'/g, "\\'")}', '${priceValue}', '${imageUrl.replace(/'/g, "\\'")}')">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                    <div class="menu-item-content">
                        <h3>${item.name}</h3>
                        ${item.desc ? `<p>${item.desc}</p>` : '<p>&nbsp;</p>'}
                        <div class="menu-item-footer">
                            <span class="price" data-price="${priceValue}">${priceDisplay}</span>
                        </div>
                        <button class="add-to-cart-btn" data-name="${item.name}" data-price="${priceValue}">
                            <i class="fas fa-cart-plus"></i> أضف للسلة
                        </button>
                    </div>
                </div>
            `;
        });
    });
    
    menuGrid.innerHTML = itemsHTML;
    
    // Rebuild products array for search
    allProducts = [];
    menuData.categories.forEach(category => {
        category.items.forEach(item => {
            let priceValue = item.price;
            if (item.price.includes(' - ')) {
                priceValue = item.price.split(' - ')[0];
            }
            
            allProducts.push({
                name: item.name,
                price: priceValue,
                category: category.name,
                categoryId: category.id,
                image: item.img || 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(item.name),
                description: item.desc || ''
            });
        });
    });
    
    // Re-attach event listeners
    attachMenuEventListeners();
}

// Attach event listeners to menu items
function attachMenuEventListeners() {
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const menuItems = document.querySelectorAll('.menu-item');
            
            menuItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Note: Add to cart buttons are handled by event delegation in script.js
    // No need to attach individual listeners here to avoid duplication
}

// Update contact information
function updateContactInfo() {
    // Update footer contact
    const footerContact = document.querySelector('.footer-contact');
    if (footerContact) {
        footerContact.innerHTML = `
            <h3>تواصل معنا</h3>
            <p><i class="fas fa-phone"></i> ${menuData.contact.phone}</p>
            <p><i class="fas fa-envelope"></i> ${menuData.contact.email}</p>
            <div class="social-icons">
                <a href="https://facebook.com/${encodeURIComponent(menuData.contact.facebook)}" target="_blank"><i class="fab fa-facebook"></i></a>
                <a href="https://instagram.com/${encodeURIComponent(menuData.contact.instagram)}" target="_blank"><i class="fab fa-instagram"></i></a>
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    generateMenu();
    updateContactInfo();
});

/* ============================================
   VOGUE USA - Main JavaScript
   eCommerce Core Functionality
   ============================================ */

'use strict';

// ============================================
// PRODUCT DATA - 30 USA Fashion Products
// ============================================
const PRODUCTS = [
  // Women's
  { id: 1, name: "Emerald Silk Wrap Dress", category: "Women's", sub: "Clothes", price: 89.99, original: 129.99, discount: 31, rating: 4.8, reviews: 234, badge: "sale", gender: "women", color: "#2e8b57", sizes: ["XS","S","M","L","XL"], image: "women-1" },
  { id: 2, name: "Classic White Oxford Blouse", category: "Women's", sub: "Clothes", price: 54.99, original: 74.99, discount: 27, rating: 4.7, reviews: 189, badge: "new", gender: "women", color: "#ffffff", sizes: ["XS","S","M","L","XL","2X"], image: "women-2" },
  { id: 3, name: "High-Rise Sculpt Denim Jeans", category: "Women's", sub: "Clothes", price: 79.99, original: 99.99, discount: 20, rating: 4.9, reviews: 512, badge: "hot", gender: "women", color: "#4a6fa5", sizes: ["25","26","27","28","29","30","31","32"], image: "women-3" },
  { id: 4, name: "Cashmere Turtleneck Sweater", category: "Women's", sub: "Clothes", price: 124.99, original: 174.99, discount: 29, rating: 4.6, reviews: 97, badge: "sale", gender: "women", color: "#8b7355", sizes: ["S","M","L"], image: "women-4" },
  { id: 5, name: "Floral Maxi Sundress", category: "Women's", sub: "Clothes", price: 68.99, original: 88.99, discount: 22, rating: 4.5, reviews: 321, badge: "new", gender: "women", color: "#f9a8d4", sizes: ["XS","S","M","L","XL"], image: "women-5" },
  // Men's
  { id: 6, name: "Slim Fit Charcoal Suit", category: "Men's", sub: "Fashion Garments", price: 249.99, original: 349.99, discount: 29, rating: 4.8, reviews: 167, badge: "sale", gender: "men", color: "#36454f", sizes: ["38R","40R","42R","44R","46R"], image: "men-1" },
  { id: 7, name: "Premium Oxford Dress Shirt", category: "Men's", sub: "Clothes", price: 64.99, original: 84.99, discount: 24, rating: 4.7, reviews: 289, badge: "new", gender: "men", color: "#1a73e8", sizes: ["S","M","L","XL","2XL"], image: "men-2" },
  { id: 8, name: "Stretch Chino Pants", category: "Men's", sub: "Clothes", price: 59.99, original: 79.99, discount: 25, rating: 4.6, reviews: 445, badge: "hot", gender: "men", color: "#c4a882", sizes: ["30x30","32x30","34x30","36x32","38x32"], image: "men-3" },
  { id: 9, name: "Merino Wool Quarter-Zip", category: "Men's", sub: "Clothes", price: 94.99, original: 124.99, discount: 24, rating: 4.9, reviews: 123, badge: "sale", gender: "men", color: "#8b4513", sizes: ["S","M","L","XL","2XL"], image: "men-4" },
  { id: 10, name: "Linen Casual Button-Down", category: "Men's", sub: "Clothes", price: 49.99, original: 64.99, discount: 23, rating: 4.5, reviews: 677, badge: "new", gender: "men", color: "#e8d5b7", sizes: ["S","M","L","XL","2XL"], image: "men-5" },
  // Kids
  { id: 11, name: "Girls Tutu Party Dress", category: "Kids", sub: "Clothes", price: 34.99, original: 49.99, discount: 30, rating: 4.8, reviews: 156, badge: "new", gender: "kids", color: "#f472b6", sizes: ["2T","3T","4T","5","6","7","8"], image: "kids-1" },
  { id: 12, name: "Boys Graphic Hoodie Set", category: "Kids", sub: "Clothes", price: 42.99, original: 59.99, discount: 28, rating: 4.7, reviews: 203, badge: "hot", gender: "kids", color: "#60a5fa", sizes: ["4","5","6","7","8","10","12"], image: "kids-2" },
  { id: 13, name: "Kids Waterproof Rain Jacket", category: "Kids", sub: "Clothes", price: 38.99, original: 54.99, discount: 29, rating: 4.9, reviews: 88, badge: "sale", gender: "kids", color: "#fbbf24", sizes: ["4","5","6","7","8","10","12"], image: "kids-3" },
  { id: 14, name: "School Uniform 3-Piece Set", category: "Kids", sub: "Clothes", price: 44.99, original: 59.99, discount: 25, rating: 4.6, reviews: 334, badge: "new", gender: "kids", color: "#1e3a5f", sizes: ["4","5","6","7","8","10","12","14"], image: "kids-4" },
  { id: 15, name: "Cozy Fleece Pajama Set", category: "Kids", sub: "Clothes", price: 29.99, original: 39.99, discount: 25, rating: 4.8, reviews: 521, badge: "hot", gender: "kids", color: "#a78bfa", sizes: ["2T","3T","4T","5","6","7","8","10"], image: "kids-5" },
  // Shoes
  { id: 16, name: "Women's Block Heel Pumps", category: "Women's", sub: "Shoes", price: 79.99, original: 109.99, discount: 27, rating: 4.6, reviews: 278, badge: "sale", gender: "women", color: "#1a1a1a", sizes: ["6","6.5","7","7.5","8","8.5","9","9.5","10"], image: "shoes-w1" },
  { id: 17, name: "Men's Leather Derby Shoes", category: "Men's", sub: "Shoes", price: 119.99, original: 159.99, discount: 25, rating: 4.8, reviews: 145, badge: "new", gender: "men", color: "#8B4513", sizes: ["8","8.5","9","9.5","10","10.5","11","12"], image: "shoes-m1" },
  { id: 18, name: "Kids Velcro Sneakers", category: "Kids", sub: "Shoes", price: 32.99, original: 44.99, discount: 27, rating: 4.7, reviews: 389, badge: "hot", gender: "kids", color: "#3b82f6", sizes: ["10","11","12","13","1","2","3"], image: "shoes-k1" },
  { id: 19, name: "Women's White Sneakers", category: "Women's", sub: "Shoes", price: 74.99, original: 94.99, discount: 21, rating: 4.9, reviews: 892, badge: "hot", gender: "women", color: "#ffffff", sizes: ["6","6.5","7","7.5","8","8.5","9","9.5"], image: "shoes-w2" },
  { id: 20, name: "Men's Trail Running Shoes", category: "Men's", sub: "Shoes", price: 94.99, original: 129.99, discount: 27, rating: 4.7, reviews: 233, badge: "sale", gender: "men", color: "#22c55e", sizes: ["8","8.5","9","9.5","10","10.5","11","12","13"], image: "shoes-m2" },
  // Fashion Garments & Accessories
  { id: 21, name: "Women's Leather Tote Bag", category: "Women's", sub: "Fashion Garments", price: 89.99, original: 124.99, discount: 28, rating: 4.7, reviews: 341, badge: "new", gender: "women", color: "#8B4513", sizes: ["One Size"], image: "acc-1" },
  { id: 22, name: "Men's Slim Tie + Pocket Square", category: "Men's", sub: "Fashion Garments", price: 29.99, original: 44.99, discount: 33, rating: 4.5, reviews: 178, badge: "sale", gender: "men", color: "#1e3a5f", sizes: ["One Size"], image: "acc-2" },
  { id: 23, name: "Women's Silk Scarf", category: "Women's", sub: "Fashion Garments", price: 44.99, original: 64.99, discount: 31, rating: 4.8, reviews: 267, badge: "hot", gender: "women", color: "#f43f5e", sizes: ["One Size"], image: "acc-3" },
  { id: 24, name: "Men's Leather Belt", category: "Men's", sub: "Fashion Garments", price: 39.99, original: 54.99, discount: 27, rating: 4.6, reviews: 445, badge: "new", gender: "men", color: "#1a1a1a", sizes: ["30","32","34","36","38","40","42"], image: "acc-4" },
  { id: 25, name: "Kids Character Backpack", category: "Kids", sub: "Fashion Garments", price: 24.99, original: 34.99, discount: 29, rating: 4.8, reviews: 689, badge: "hot", gender: "kids", color: "#7c3aed", sizes: ["One Size"], image: "acc-5" },
  // Undergarments
  { id: 26, name: "Women's Comfort Bralette Set", category: "Women's", sub: "Undergarments", price: 34.99, original: 49.99, discount: 30, rating: 4.7, reviews: 512, badge: "sale", gender: "women", color: "#fbbf24", sizes: ["XS","S","M","L","XL"], image: "under-w1" },
  { id: 27, name: "Men's Boxer Briefs 4-Pack", category: "Men's", sub: "Undergarments", price: 29.99, original: 39.99, discount: 25, rating: 4.8, reviews: 1203, badge: "hot", gender: "men", color: "#1a1a1a", sizes: ["S","M","L","XL","2XL"], image: "under-m1" },
  { id: 28, name: "Women's Full Coverage Brief 6-Pack", category: "Women's", sub: "Undergarments", price: 27.99, original: 39.99, discount: 30, rating: 4.6, reviews: 734, badge: "sale", gender: "women", color: "#f9a8d4", sizes: ["S","M","L","XL","2X","3X"], image: "under-w2" },
  { id: 29, name: "Men's Crew Neck Undershirt 3-Pack", category: "Men's", sub: "Undergarments", price: 24.99, original: 34.99, discount: 29, rating: 4.7, reviews: 891, badge: "new", gender: "men", color: "#ffffff", sizes: ["S","M","L","XL","2XL"], image: "under-m2" },
  { id: 30, name: "Kids Cotton Underwear 7-Pack", category: "Kids", sub: "Undergarments", price: 22.99, original: 31.99, discount: 28, rating: 4.9, reviews: 445, badge: "hot", gender: "kids", color: "#93c5fd", sizes: ["4","5","6","7","8","10","12","14"], image: "under-k1" }
];

// ============================================
// CART STATE
// ============================================
let cart = JSON.parse(localStorage.getItem('vogueusa_cart') || '[]');

function saveCart() {
  localStorage.setItem('vogueusa_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, size = 'M', color = null, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingIdx = cart.findIndex(i => i.id === productId && i.size === size);
  if (existingIdx !== -1) {
    cart[existingIdx].qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      size: size,
      color: color || product.color,
      qty: qty
    });
  }

  saveCart();
  showToast(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId, size) {
  cart = cart.filter(i => !(i.id === productId && i.size === size));
  saveCart();
}

function updateCartQty(productId, size, qty) {
  const item = cart.find(i => i.id === productId && i.size === size);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart();
  }
}

function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

function updateCartUI() {
  const count = getCartCount();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
  renderCartSidebar();
}

// ============================================
// CART SIDEBAR
// ============================================
function renderCartSidebar() {
  const sidebar = document.getElementById('cartSidebar');
  const itemsContainer = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛍️</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <button class="btn-add-cart" onclick="closeCart()" style="padding:12px 28px;width:auto;">
          Continue Shopping
        </button>
      </div>`;
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  if (footerEl) footerEl.style.display = 'block';

  itemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img class="cart-item-image" src="${getProductImageURL(item.image)}" alt="${item.name}" onerror="this.src=getPlaceholderSVG('${item.category}')">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">Size: ${item.size} &bull; ${item.category}</div>
        <div class="cart-item-controls">
          <div class="qty-selector">
            <button class="qty-btn" onclick="changeQty(${item.id},'${item.size}',-1)">−</button>
            <input type="number" class="qty-input" value="${item.qty}" min="1" onchange="changeQty(${item.id},'${item.size}',0,this.value)">
            <button class="qty-btn" onclick="changeQty(${item.id},'${item.size}',1)">+</button>
          </div>
          <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        </div>
        <button class="remove-item" onclick="removeFromCart(${item.id},'${item.size}')">
          🗑️ Remove
        </button>
      </div>
    </div>`).join('');

  // Update totals
  const subtotal = getCartTotal();
  const shipping = subtotal > 75 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('cartShipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  document.getElementById('cartTax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
  document.getElementById('cartCountText').textContent = `${getCartCount()} item${getCartCount() !== 1 ? 's' : ''}`;
}

function changeQty(id, size, delta, exactVal = null) {
  const item = cart.find(i => i.id === id && i.size === size);
  if (!item) return;
  if (exactVal !== null) {
    item.qty = Math.max(1, parseInt(exactVal) || 1);
  } else {
    item.qty = Math.max(1, item.qty + delta);
  }
  if (item.qty === 0) removeFromCart(id, size);
  else saveCart();
}

function openCart() {
  document.getElementById('cartOverlay')?.classList.add('open');
  document.getElementById('cartSidebar')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.getElementById('cartSidebar')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================
// HERO SLIDER
// ============================================
const HERO_SLIDES = [
  {
    // Unsplash: woman in stylish outfit — royalty free
    bg: 'url("https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=85")',
    eyebrow: 'New Collection 2025',
    title: 'Dress for Your <em>Best Story</em>',
    subtitle: 'Discover premium American fashion curated for the modern wardrobe.',
    cta1: 'Shop Women', cta1href: 'pages/category.html?cat=women',
    cta2: 'Explore Men', cta2href: 'pages/category.html?cat=men',
  },
  {
    // Unsplash: men's fashion editorial — royalty free
    bg: 'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=85")',
    eyebrow: 'Flash Sale — Up to 40% Off',
    title: '<em>Premium</em> Style, Unbeatable Prices',
    subtitle: 'Limited time offer across all categories. Free shipping on orders over $75.',
    cta1: 'Shop the Sale', cta1href: '#productsSection',
    cta2: "Men's Deals", cta2href: 'pages/category.html?cat=men',
  },
  {
    // Unsplash: kids fashion — royalty free
    bg: 'url("https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=1600&q=85")',
    eyebrow: "Kids' Collection",
    title: 'Style That Grows <em>With Them</em>',
    subtitle: 'Adorable, durable and affordable clothes for the little ones in your life.',
    cta1: 'Shop Kids', cta1href: 'pages/category.html?cat=kids',
    cta2: 'View All', cta2href: '#productsSection',
  }
];

let currentSlide = 0;
let slideTimer;

function renderHeroSlide(idx) {
  const slide = HERO_SLIDES[idx];
  // Support both image URL and gradient
  const bgStyle = slide.bg.startsWith('url(')
    ? `background-image: ${slide.bg}; background-size: cover; background-position: center top;`
    : `background: ${slide.bg};`;
  return `
    <div class="hero-slide ${idx === 0 ? 'active' : ''}">
      <div class="hero-bg" style="${bgStyle}"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-eyebrow">${slide.eyebrow}</span>
        <h1 class="hero-title">${slide.title}</h1>
        <p class="hero-subtitle">${slide.subtitle}</p>
        <div class="hero-cta">
          <a href="${slide.cta1href}" class="btn-hero-primary">
            ${slide.cta1} <span>→</span>
          </a>
          <a href="${slide.cta2href}" class="btn-hero-secondary">
            ${slide.cta2}
          </a>
        </div>
      </div>
    </div>`;
}

function initHeroSlider() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const slidesWrap = hero.querySelector('.hero-slides-wrap') || document.createElement('div');
  slidesWrap.className = 'hero-slides-wrap';

  HERO_SLIDES.forEach((_, i) => {
    slidesWrap.innerHTML += renderHeroSlide(i);
  });

  hero.prepend(slidesWrap);

  // Dots
  const dotsEl = hero.querySelector('.hero-dots');
  if (dotsEl) {
    dotsEl.innerHTML = HERO_SLIDES.map((_, i) =>
      `<button class="hero-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></button>`
    ).join('');
  }

  startSlideTimer();
}

function goToSlide(idx) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');

  slides[currentSlide]?.classList.remove('active');
  dots[currentSlide]?.classList.remove('active');

  currentSlide = (idx + HERO_SLIDES.length) % HERO_SLIDES.length;

  slides[currentSlide]?.classList.add('active');
  dots[currentSlide]?.classList.add('active');

  restartSlideTimer();
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startSlideTimer() {
  slideTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
}

function restartSlideTimer() {
  clearInterval(slideTimer);
  startSlideTimer();
}

// ============================================
// PRODUCT RENDERING
// ============================================
const PRODUCT_COLORS_PALETTE = ['#c8102e', '#1a73e8', '#f5a623', '#27ae60', '#8e44ad', '#e67e22', '#1a1a1a', '#95a5a6'];

function getProductImageURL(imageKey) {
  // Real royalty-free product images from Unsplash — matched to product names
  const seeds = {
    // Women's Clothing
    'women-1': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=530&fit=crop&q=80',  // Wrap dress
    'women-2': 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=530&fit=crop&q=80',  // White blouse
    'women-3': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=530&fit=crop&q=80',  // Denim jeans
    'women-4': 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=530&fit=crop&q=80',  // Turtleneck sweater
    'women-5': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=530&fit=crop&q=80',  // Floral maxi dress
    // Men's Clothing
    'men-1':   'https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=400&h=530&fit=crop&q=80',  // Charcoal suit
    'men-2':   'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&h=530&fit=crop&q=80',  // Oxford dress shirt
    'men-3':   'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=530&fit=crop&q=80',  // Chino pants
    'men-4':   'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=400&h=530&fit=crop&q=80',  // Quarter-zip sweater
    'men-5':   'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=530&fit=crop&q=80',  // Linen button-down
    // Kids Clothing
    'kids-1':  'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=530&fit=crop&q=80',  // Girls dress
    'kids-2':  'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&h=530&fit=crop&q=80',  // Boys hoodie
    'kids-3':  'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=400&h=530&fit=crop&q=80',  // Kids rain jacket
    'kids-4':  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=400&h=530&fit=crop&q=80',  // School uniform
    'kids-5':  'https://images.unsplash.com/photo-1558171813-25c4d9cef59d?w=400&h=530&fit=crop&q=80',  // Kids pajamas
    // Women's Shoes
    'shoes-w1':'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=530&fit=crop&q=80',  // Block heel pumps
    'shoes-w2':'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=530&fit=crop&q=80',  // White sneakers
    // Men's Shoes
    'shoes-m1':'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=530&fit=crop&q=80',  // Derby leather shoes
    'shoes-m2':'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=530&fit=crop&q=80',  // Trail running shoes
    // Kids Shoes
    'shoes-k1':'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=530&fit=crop&q=80',  // Kids sneakers
    // Accessories
    'acc-1':   'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=530&fit=crop&q=80',  // Leather tote bag
    'acc-2':   'https://images.unsplash.com/photo-1589756823695-278bc923f962?w=400&h=530&fit=crop&q=80',  // Men's tie
    'acc-3':   'https://images.unsplash.com/photo-1601924921557-45b0f8c3e5b5?w=400&h=530&fit=crop&q=80',  // Silk scarf
    'acc-4':   'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=530&fit=crop&q=80',  // Leather belt
    'acc-5':   'https://images.unsplash.com/photo-1553062407-98eeb64c6a45?w=400&h=530&fit=crop&q=80',  // Kids backpack
    // Undergarments (tasteful packshot style)
    'under-w1':'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=530&fit=crop&q=80',  // Bralette
    'under-w2':'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=400&h=530&fit=crop&q=80',  // Women's briefs
    'under-m1':'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=530&fit=crop&q=80',  // Boxer briefs packshot
    'under-m2':'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=530&fit=crop&q=80',  // Men's undershirt
    'under-k1':'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=530&fit=crop&q=80',  // Kids underwear packshot
  };
  return seeds[imageKey] || `https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=530&fit=crop&q=80`;
}

function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars += '★';
    else if (i - 0.5 <= rating) stars += '☆';
    else stars += '☆';
  }
  return stars;
}

function getBadgeClass(badge) {
  if (badge === 'new') return 'new-badge';
  if (badge === 'hot') return 'hot-badge';
  return '';
}

function getBadgeLabel(badge) {
  if (badge === 'sale') return `−${PRODUCTS.find(p => p.badge === badge)?.discount || ''}%`;
  if (badge === 'new') return 'NEW';
  if (badge === 'hot') return '🔥 HOT';
  return badge;
}

function renderProductCard(product) {
  const badgeLabel = product.badge === 'sale' ? `−${product.discount}%` :
    product.badge === 'new' ? 'NEW' : '🔥 HOT';

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image-wrap">
        <img
          src="${getProductImageURL(product.image)}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg,${product.color}22,${product.color}44)'; this.parentElement.setAttribute('data-emoji','👗')"
        >
        <span class="product-badge ${getBadgeClass(product.badge)}">${badgeLabel}</span>
        <button class="product-wishlist" onclick="toggleWishlist(this, ${product.id})" title="Add to wishlist">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </button>
        <div class="quick-view-btn" onclick="openQuickView(${product.id})">Quick View</div>
      </div>
      <div class="product-info">
        <div class="product-category">${product.sub} · ${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          <div class="stars">${renderStars(product.rating)}</div>
          <span class="rating-count">(${product.reviews.toLocaleString()})</span>
        </div>
        <div class="product-price">
          <span class="price-current">$${product.price.toFixed(2)}</span>
          <span class="price-original">$${product.original.toFixed(2)}</span>
          <span class="price-save">Save ${product.discount}%</span>
        </div>
        <button class="btn-add-cart" onclick="addToCart(${product.id}, '${product.sizes[1] || product.sizes[0]}')">
          Add to Cart
        </button>
      </div>
    </div>`;
}

// ============================================
// PRODUCTS GRID + PAGINATION
// ============================================
const PRODUCTS_PER_PAGE = 30;
let currentPage = 1;
let filteredProducts = [...PRODUCTS];

function renderProducts(page = 1, filter = null, ageFilter = null) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  // Apply filters
  let products = [...PRODUCTS];

  if (filter && filter !== 'all') {
    if (['women', 'men', 'kids'].includes(filter)) {
      products = products.filter(p => p.gender === filter);
    } else if (['Clothes','Shoes','Undergarments','Fashion Garments'].includes(filter)) {
      products = products.filter(p => p.sub === filter);
    }
  }

  if (ageFilter && ageFilter !== 'all') {
    const ageMap = {
      kids: 'kids',
      teens: ['women','men'],
      adults: ['women','men']
    };
    if (ageFilter === 'kids') products = products.filter(p => p.gender === 'kids');
  }

  filteredProducts = products;

  const start = 0;
  const end = Math.min(page * 30, products.length);
  const toShow = products.slice(start, end);

  grid.innerHTML = toShow.map(p => renderProductCard(p)).join('');

  const paginationWrap = document.getElementById('paginationWrap');
  if (paginationWrap) {
    paginationWrap.style.display = end < products.length ? 'block' : 'none';
  }
}

function loadNextPage() {
  currentPage++;
  renderProducts(currentPage);
  document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// QUICK VIEW MODAL
// ============================================
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quickViewModal');
  const overlay = document.getElementById('modalOverlay');
  if (!modal || !overlay) return;

  modal.innerHTML = `
    <div class="modal-inner" style="position:relative">
      <button class="modal-close" onclick="closeQuickView()">✕</button>
      <img class="modal-image" src="${getProductImageURL(product.image)}" alt="${product.name}"
        onerror="this.style.background='${product.color}22'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'">
      <div class="modal-info">
        <div class="modal-category">${product.sub} · ${product.category}</div>
        <h2 class="modal-product-name">${product.name}</h2>
        <div class="product-rating" style="margin-bottom:16px">
          <div class="stars">${renderStars(product.rating)}</div>
          <span class="rating-count">(${product.reviews.toLocaleString()} reviews)</span>
        </div>
        <div class="modal-price">
          <span class="price-current">$${product.price.toFixed(2)}</span>
          <span class="price-original">$${product.original.toFixed(2)}</span>
          <span class="price-save">Save ${product.discount}%</span>
        </div>
        <div class="size-section">
          <h6>Select Size</h6>
          <div class="size-options">
            ${product.sizes.map((s, i) => `
              <button class="size-btn ${i === 1 ? 'active' : ''}" onclick="selectSize(this, '${s}')" data-size="${s}">${s}</button>
            `).join('')}
          </div>
        </div>
        <div class="color-section">
          <h6>Color</h6>
          <div class="color-options">
            ${PRODUCT_COLORS_PALETTE.slice(0, 4).map((c, i) => `
              <div class="color-dot ${i === 0 ? 'active' : ''}" style="background:${c}" onclick="selectColor(this)" title="Color ${i+1}"></div>
            `).join('')}
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-modal-cart" onclick="addToCartFromModal(${product.id})">🛒 Add to Cart</button>
          <a href="pages/product.html?id=${product.id}" class="btn-modal-buy">Buy Now →</a>
        </div>
        <div style="margin-top:16px;font-size:12px;color:var(--gray);display:flex;gap:16px;">
          <span>🔒 Secure Checkout</span>
          <span>🚚 Free Ship $75+</span>
          <span>↩️ Easy Returns</span>
        </div>
      </div>
    </div>`;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function addToCartFromModal(productId) {
  const activeSize = document.querySelector('.size-btn.active');
  const size = activeSize?.dataset.size || 'M';
  addToCart(productId, size);
  closeQuickView();
  openCart();
}

function closeQuickView() {
  document.getElementById('modalOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function selectSize(btn, size) {
  btn.closest('.size-options, .size-options-detail').querySelectorAll('.size-btn, .size-btn-detail').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function selectColor(dot) {
  dot.closest('.color-options, .color-options-detail').querySelectorAll('.color-dot, .color-swatch').forEach(d => d.classList.remove('active'));
  dot.classList.add('active');
}

// ============================================
// WISHLIST (local state)
// ============================================
let wishlist = JSON.parse(localStorage.getItem('vogueusa_wishlist') || '[]');

function toggleWishlist(btn, productId) {
  const idx = wishlist.indexOf(productId);
  if (idx === -1) {
    wishlist.push(productId);
    btn.classList.add('active');
    btn.textContent = '♥';
    showToast('❤️ Added to wishlist!');
  } else {
    wishlist.splice(idx, 1);
    btn.classList.remove('active');
    btn.textContent = '♡';
    showToast('Removed from wishlist');
  }
  localStorage.setItem('vogueusa_wishlist', JSON.stringify(wishlist));
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
let toastTimer;
function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">✓</span> ${message}`;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

// ============================================
// NAVIGATION & MOBILE MENU
// ============================================
function initNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // Nav item mobile toggle
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        item.classList.toggle('open');
        e.stopPropagation();
      }
    });
  });

  // Close nav on outside click
  document.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      nav?.classList.remove('open');
    }
  });
}

// ============================================
// AGE FILTER
// ============================================
function initAgeFilter() {
  document.querySelectorAll('.age-pill').forEach(pill => {
    pill.addEventListener('click', function () {
      document.querySelectorAll('.age-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      renderProducts(1, null, this.dataset.age);
    });
  });
}

// ============================================
// COUNTDOWN TIMER
// ============================================
function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;

  // Set end time to 24h from now
  const end = Date.now() + 86400000;

  function tick() {
    const diff = Math.max(0, end - Date.now());
    const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');

    const hours = el.querySelector('[data-unit="hours"]');
    const mins = el.querySelector('[data-unit="mins"]');
    const secs = el.querySelector('[data-unit="secs"]');
    if (hours) hours.textContent = h;
    if (mins) mins.textContent = m;
    if (secs) secs.textContent = s;
  }

  tick();
  setInterval(tick, 1000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.product-card, .cat-card, .feature-item, .value-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // CSS class for visible state
  const style = document.createElement('style');
  style.textContent = `.visible { opacity: 1 !important; transform: none !important; }`;
  document.head.appendChild(style);
}

// ============================================
// CATEGORY BACKGROUNDS (SVG placeholder)
// ============================================
const CAT_BACKGROUNDS = {
  "Women's": 'linear-gradient(135deg, #f9a8d4 0%, #ec4899 100%)',
  "Men's": 'linear-gradient(135deg, #93c5fd 0%, #1d4ed8 100%)',
  "Kids": 'linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)',
  "Shoes": 'linear-gradient(135deg, #a7f3d0 0%, #059669 100%)',
};

function initCategoryCards() {
  document.querySelectorAll('.cat-card').forEach(card => {
    const bg = card.dataset.bg;
    if (bg) {
      const bgEl = card.querySelector('.cat-card-bg');
      if (bgEl) bgEl.style.background = bg;
    }
  });
}

// ============================================
// SEARCH
// ============================================
function initSearch() {
  const searchInput = document.querySelector('.header-search input');
  if (!searchInput) return;

  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      const q = searchInput.value.trim();
      if (q) {
        const filtered = PRODUCTS.filter(p =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.category.toLowerCase().includes(q.toLowerCase()) ||
          p.sub.toLowerCase().includes(q.toLowerCase())
        );
        const grid = document.getElementById('productsGrid');
        if (grid) {
          grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
          document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHeroSlider();
  renderProducts();
  initAgeFilter();
  initCountdown();
  initSearch();
  updateCartUI();
  initCategoryCards();

  // Delay scroll animations slightly
  setTimeout(initScrollAnimations, 300);

  // Cart overlay click to close
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
  document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalOverlay')) closeQuickView();
  });
});

/* ============================================
   VOGUE USA - Cart Page JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();
});

function renderCartPage() {
  const tbody = document.getElementById('cartTableBody');
  const summaryEl = document.getElementById('cartPageSummary');
  const emptyState = document.getElementById('cartEmptyState');
  const cartContent = document.getElementById('cartContent');

  if (!cart || cart.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (cartContent) cartContent.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (cartContent) cartContent.style.display = 'grid';

  if (tbody) {
    tbody.innerHTML = cart.map(item => `
      <tr class="cart-row">
        <td>
          <div class="cart-product-cell">
            <img class="cart-page-img"
              src="${getProductImageURL(item.image)}"
              alt="${item.name}"
              onerror="this.style.background='#f5f5f5'; this.src=''"
            >
            <div>
              <div class="cart-product-name">${item.name}</div>
              <div class="cart-product-meta">Size: ${item.size} &bull; ${item.category}</div>
              <a href="../pages/product.html?id=${item.id}" style="font-size:12px;color:var(--accent);text-decoration:underline;">View Details</a>
            </div>
          </div>
        </td>
        <td class="cart-price">$${item.price.toFixed(2)}</td>
        <td>
          <div class="qty-selector-table">
            <button class="qty-btn" onclick="pageChangeQty(${item.id},'${item.size}',-1)">−</button>
            <input type="number" class="qty-num" value="${item.qty}" min="1"
              onchange="pageChangeQty(${item.id},'${item.size}',0,this.value)">
            <button class="qty-btn" onclick="pageChangeQty(${item.id},'${item.size}',1)">+</button>
          </div>
        </td>
        <td class="cart-total-price">$${(item.price * item.qty).toFixed(2)}</td>
        <td>
          <button class="remove-row-btn" onclick="pageRemoveItem(${item.id},'${item.size}')" title="Remove">✕</button>
        </td>
      </tr>
    `).join('');
  }

  updatePageSummary();
}

function pageChangeQty(id, size, delta, exactVal = null) {
  const item = cart.find(i => i.id === id && i.size === size);
  if (!item) return;
  if (exactVal !== null) {
    item.qty = Math.max(1, parseInt(exactVal) || 1);
  } else {
    item.qty = Math.max(1, item.qty + delta);
  }
  saveCart();
  renderCartPage();
}

function pageRemoveItem(id, size) {
  cart = cart.filter(i => !(i.id === id && i.size === size));
  saveCart();
  renderCartPage();
  showToast('Item removed from cart');
}

function updatePageSummary() {
  const subtotal = getCartTotal();
  const shipping = subtotal > 75 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('pageSubtotal', `$${subtotal.toFixed(2)}`);
  set('pageShipping', shipping === 0 ? 'FREE 🎉' : `$${shipping.toFixed(2)}`);
  set('pageTax', `$${tax.toFixed(2)}`);
  set('pageTotal', `$${total.toFixed(2)}`);

  const countEl = document.getElementById('cartPageCount');
  if (countEl) countEl.textContent = `${getCartCount()} item${getCartCount() !== 1 ? 's' : ''}`;
}

function applyCoupon() {
  const input = document.getElementById('couponInput');
  const code = input?.value.trim().toUpperCase();
  const COUPONS = { 'SAVE10': 10, 'VOGUE20': 20, 'FIRST15': 15 };

  if (COUPONS[code]) {
    showToast(`✅ Coupon applied! ${COUPONS[code]}% off`, 'success');
  } else {
    showToast('Invalid coupon code. Try SAVE10');
  }
}

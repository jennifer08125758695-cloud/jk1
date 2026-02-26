/* ============================================
   VOGUE USA - Checkout Page JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutSummary();
  initPaymentToggle();
  initFormValidation();
});

function renderCheckoutSummary() {
  const itemsEl = document.getElementById('checkoutItems');
  const emptyEl = document.getElementById('checkoutEmpty');

  if (!cart || cart.length === 0) {
    if (itemsEl) itemsEl.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }

  if (itemsEl) {
    itemsEl.innerHTML = cart.map(item => `
      <div class="checkout-item">
        <img src="${getProductImageURL(item.image)}" alt="${item.name}"
          onerror="this.style.background='#f5f5f5'">
        <div class="checkout-item-info">
          <div class="checkout-item-name">${item.name}</div>
          <div class="checkout-item-meta">Size: ${item.size} · Qty: ${item.qty}</div>
        </div>
        <div class="checkout-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>`).join('');
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 75 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('coSubtotal', `$${subtotal.toFixed(2)}`);
  set('coShipping', shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`);
  set('coTax', `$${tax.toFixed(2)}`);
  set('coTotal', `$${total.toFixed(2)}`);
}

function initPaymentToggle() {
  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.addEventListener('click', function () {
      document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
      this.classList.add('selected');
      this.querySelector('input[type="radio"]').checked = true;

      const cardFields = document.getElementById('cardFields');
      if (this.dataset.method === 'card') {
        cardFields?.classList.add('show');
      } else {
        cardFields?.classList.remove('show');
      }
    });
  });
}

function initFormValidation() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    placeOrder();
  });
}

function placeOrder() {
  const btn = document.getElementById('placeOrderBtn');
  if (!cart || cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }

  // Validate required fields
  const required = form.querySelectorAll('[required]');
  let valid = true;
  required.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = 'var(--accent)';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });

  if (!valid) {
    showToast('Please fill in all required fields');
    return;
  }

  if (btn) {
    btn.innerHTML = `<span class="spinner" style="width:20px;height:20px;border:2px solid rgba(255,255,255,.4);border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite;display:inline-block"></span> Processing...`;
    btn.disabled = true;
  }

  // Add spinner keyframe
  const style = document.createElement('style');
  style.textContent = '@keyframes spin { to { transform: rotate(360deg) } }';
  document.head.appendChild(style);

  setTimeout(() => {
    // Clear cart
    cart = [];
    saveCart();

    // Redirect to success page
    window.location.href = 'order-success.html';
  }, 2000);
}

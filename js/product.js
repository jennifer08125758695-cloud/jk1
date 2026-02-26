/* ============================================
   VOGUE USA - Product Detail Page JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')) || 1;
  renderProductDetail(id);
  initTabs();
});

function renderProductDetail(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) {
    document.querySelector('.product-detail-page').innerHTML =
      '<div class="container" style="padding:80px 0;text-align:center"><h2>Product not found</h2><a href="../index.html" style="color:var(--accent)">← Back to Home</a></div>';
    return;
  }

  // Update breadcrumb
  const bc = document.getElementById('detailBreadcrumb');
  if (bc) {
    bc.innerHTML = `
      <a href="../index.html">Home</a>
      <span class="sep">›</span>
      <a href="category.html?cat=${product.gender}">${product.category}</a>
      <span class="sep">›</span>
      <span class="current">${product.name}</span>`;
  }

  // Gallery
  const mainImg = document.getElementById('galleryMain');
  const thumbsEl = document.getElementById('galleryThumbs');

  const thumbSeeds = [product.image, product.image+'2', product.image+'3', product.image+'4'];
  const imgURL = getProductImageURL(product.image);

  if (mainImg) {
    mainImg.innerHTML = `<img id="mainGalleryImg" src="${imgURL}" alt="${product.name}">`;
  }

  if (thumbsEl) {
    thumbsEl.innerHTML = thumbSeeds.map((seed, i) => `
      <div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="switchGalleryImg(this, '${getProductImageURL(seed)}')">
        <img src="${getProductImageURL(seed)}" alt="View ${i+1}" onerror="this.parentElement.style.background='${product.color}22'">
      </div>`).join('');
  }

  // Product info
  document.getElementById('detailCategory').textContent = `${product.sub} · ${product.category}`;
  document.getElementById('detailName').textContent = product.name;
  document.getElementById('detailRatingStars').innerHTML = renderStars(product.rating);
  document.getElementById('detailRatingAvg').textContent = product.rating;
  document.getElementById('detailReviewCount').textContent = `${product.reviews.toLocaleString()} reviews`;
  document.getElementById('detailPriceCurrent').textContent = `$${product.price.toFixed(2)}`;
  document.getElementById('detailPriceOriginal').textContent = `$${product.original.toFixed(2)}`;
  document.getElementById('detailPriceSave').textContent = `Save ${product.discount}%`;

  // Sizes
  const sizesEl = document.getElementById('detailSizes');
  if (sizesEl) {
    sizesEl.innerHTML = product.sizes.map((s, i) => `
      <button class="size-btn-detail ${i === 1 ? 'active' : ''}" onclick="selectSize(this, '${s}')" data-size="${s}">${s}</button>
    `).join('');
  }

  // Colors
  const colorsEl = document.getElementById('detailColors');
  const colors = [product.color, ...PRODUCT_COLORS_PALETTE.slice(0, 3)];
  if (colorsEl) {
    colorsEl.innerHTML = colors.map((c, i) => `
      <div class="color-swatch ${i === 0 ? 'active' : ''}" style="background:${c}" onclick="selectColor(this)" title="Color option"></div>
    `).join('');
  }

  // Add to cart button
  document.getElementById('detailAddCart')?.addEventListener('click', () => {
    const size = document.querySelector('.size-btn-detail.active')?.dataset.size || product.sizes[0];
    const qty = parseInt(document.getElementById('detailQty')?.value) || 1;
    addToCart(product.id, size, null, qty);
    openCart();
  });

  document.getElementById('detailBuyNow')?.addEventListener('click', () => {
    const size = document.querySelector('.size-btn-detail.active')?.dataset.size || product.sizes[0];
    const qty = parseInt(document.getElementById('detailQty')?.value) || 1;
    addToCart(product.id, size, null, qty);
    window.location.href = 'checkout.html';
  });

  // Description tab
  document.getElementById('tabDescription').innerHTML = `
    <div class="product-description">
      <p>Elevate your wardrobe with the <strong>${product.name}</strong> — a premium piece from our ${product.category} collection, designed for the modern American lifestyle.</p>
      <h4>Product Details</h4>
      <p>Category: ${product.category} › ${product.sub}<br>
      Available Sizes: ${product.sizes.join(', ')}<br>
      Discounted Price: $${product.price.toFixed(2)} (was $${product.original.toFixed(2)})<br>
      Save: ${product.discount}% off</p>
      <h4>Material & Care</h4>
      <p>Crafted from premium, ethically-sourced materials. Machine washable — cold water, gentle cycle. Tumble dry low. Do not bleach. Iron at low temperature if needed.</p>
      <h4>Shipping & Returns</h4>
      <p>Ships within 1–2 business days. Free standard shipping on orders over $75. 30-day hassle-free returns on unworn items with tags attached.</p>
    </div>`;

  // Reviews tab
  document.getElementById('tabReviews').innerHTML = `
    <div class="reviews-list">
      ${generateReviews(product).map(r => `
        <div class="review-card">
          <div class="review-header">
            <div>
              <div class="reviewer-name">${r.name}</div>
              <div class="reviewer-meta">${r.date} · Verified Purchase</div>
            </div>
            <div class="review-stars">${renderStars(r.rating)}</div>
          </div>
          <p class="review-text">${r.text}</p>
        </div>`).join('')}
    </div>
    <div class="review-form">
      <h4>Write a Review</h4>
      <div class="form-group">
        <label>Your Name</label>
        <input type="text" placeholder="John D.">
      </div>
      <div class="form-group">
        <label>Rating</label>
        <div style="display:flex;gap:8px;font-size:24px;cursor:pointer;margin-top:4px" id="starRater">
          ${[1,2,3,4,5].map(i => `<span onclick="setReviewRating(${i})" data-val="${i}">☆</span>`).join('')}
        </div>
      </div>
      <div class="form-group">
        <label>Review</label>
        <textarea placeholder="Share your thoughts about this product..." rows="4"></textarea>
      </div>
      <button class="btn-detail-cart" style="width:auto;padding:12px 28px" onclick="submitReview()">
        Submit Review
      </button>
    </div>`;

  // Update page title & meta
  document.title = `${product.name} | VOGUE USA`;
}

function generateReviews(product) {
  const names = ['Sarah M.', 'James T.', 'Emma L.', 'Michael R.', 'Olivia K.'];
  const texts = [
    `Absolutely love this! The quality exceeded my expectations and it fits perfectly. Would definitely buy again.`,
    `Great value for the price. Shipped fast and the product looks exactly like the pictures. My new favorite!`,
    `Perfect for everyday wear. Comfortable, stylish, and well made. Highly recommend to anyone looking for quality fashion.`,
    `Received so many compliments wearing this. The material feels premium and the sizing is accurate. 5 stars!`,
    `Fantastic purchase! Exactly what I was looking for. Great quality and arrived quickly. Will definitely order more.`
  ];
  const dates = ['Jan 15, 2025', 'Feb 3, 2025', 'Mar 22, 2025', 'Apr 7, 2025', 'May 18, 2025'];
  const ratings = [5, 5, 4, 5, 4];

  return names.map((name, i) => ({
    name,
    text: texts[i],
    date: dates[i],
    rating: ratings[i]
  }));
}

function switchGalleryImg(thumb, url) {
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
  const main = document.getElementById('mainGalleryImg');
  if (main) main.src = url;
}

function setReviewRating(val) {
  document.querySelectorAll('#starRater span').forEach((s, i) => {
    s.textContent = i < val ? '★' : '☆';
    s.style.color = i < val ? '#f5a623' : '#ccc';
  });
}

function submitReview() {
  showToast('✅ Thank you for your review!', 'success');
}

// Qty controls for detail page
function detailQtyChange(delta) {
  const input = document.getElementById('detailQty');
  if (!input) return;
  input.value = Math.max(1, parseInt(input.value) + delta);
}

function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const target = this.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      document.getElementById(`tab${target}`)?.classList.add('active');
    });
  });
}

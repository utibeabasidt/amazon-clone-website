import { addToStorage, cart } from '../data/cart.js';
import { deleteProduct } from '../data/cart.js';
import { getCartQuantity } from '../data/cart.js';

let shippingFeeCents = 0; // ← ALWAYS work in CENTS

export function updateCheckout() {
  document.querySelector('.js-cart-quantity-link').innerText = `${getCartQuantity()} Items`

  let allProductOrderCode = '';
  let totalQuantity = 0;
  let generalTotalPriceCents = 0; // ← total in CENTS

  // === 1. Loop through cart items ===
  for (let i = 0; i < cart.productIds.length; i++) {
    const productId = cart.productIds[i];
    const productImage = cart.productImage[i];
    const productName = cart.productName[i];
    const productPriceCents = cart.productPrice[i] * 100;     // already in cents
    const quantity = cart.quantity[i];
    const totalPriceCents = cart.totalPrice[i] * 100;         // already in cents

    totalQuantity += quantity;
    generalTotalPriceCents += totalPriceCents;

    allProductOrderCode += `
      <div class="cart-item-container">
        <div class="delivery-date">Delivery date: Tuesday, June 21</div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${productImage}" />

          <div class="cart-item-details">
          <div class="product-name">${productId}</div>
            <div class="product-name">${productName}</div>
            <div class="product-price">$${(productPriceCents/100).toFixed(2)}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label">${quantity}</span></span>
              <span class="update-quantity-link link-primary js-update-btn">Update</span>
              <input type="text" class="quantity-input js-quantity-input">
              <span class="save-quantity-link link-primary js-save-btn">Save</span>
              <span class="delete-quantity-link link-primary js-delete-button" data-index="${i}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>

            <div class="delivery-option">
              <input type="radio" class="delivery-option-input js-delivery-option-input"
                name="delivery-option-for-${productId}" checked value="free" data-cost="0"/>
              <div><div class="delivery-option-date">Tuesday, June 21</div><div class="delivery-option-price">FREE Shipping</div></div>
            </div>

            <div class="delivery-option">
              <input type="radio" class="delivery-option-input js-delivery-option-input"
                name="delivery-option-for-${productId}" value="fast" data-cost="499"/>
              <div><div class="delivery-option-date">Wednesday, June 15</div><div class="delivery-option-price">$4.99</div></div>
            </div>

            <div class="delivery-option">
              <input type="radio" class="delivery-option-input js-delivery-option-input"
                name="delivery-option-for-${productId}" value="express" data-cost="999"/>
              <div><div class="delivery-option-date">Monday, June 13</div><div class="delivery-option-price">$9.99</div></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // === 2. Calculate totals (ALL IN CENTS) ===
  const totalBeforeTaxCents = generalTotalPriceCents + shippingFeeCents;
  const taxCents = Math.round(totalBeforeTaxCents * 0.1); // 10% tax
  const orderTotalCents = totalBeforeTaxCents + taxCents;

  // === 3. Payment Summary HTML ===
  const orderSummaryCode = `
    <div class="payment-summary">
      <div class="payment-summary-title">Order Summary</div>
      <div class="payment-summary-row"><div>Items (${totalQuantity}):</div><div class="payment-summary-money">$${(generalTotalPriceCents / 100).toFixed(2)}</div></div>
      <div class="payment-summary-row"><div>Shipping & handling:</div><div class="payment-summary-money">$${(shippingFeeCents / 100).toFixed(2)}</div></div>
      <div class="payment-summary-row subtotal-row"><div>Total before tax:</div><div class="payment-summary-money">$${(totalBeforeTaxCents / 100).toFixed(2)}</div></div>
      <div class="payment-summary-row"><div>Estimated tax (10%):</div><div class="payment-summary-money">$${(taxCents / 100).toFixed(2)}</div></div>
      <div class="payment-summary-row total-row"><div>Order total:</div><div class="payment-summary-money">$${(orderTotalCents / 100).toFixed(2)}</div></div>
      <button class="place-order-button button-primary">Place your order</button>
    </div>
  `;

  const container = document.querySelector('.js-order-summary');
  if (cart.productIds.length === 0) {
    container.innerHTML = '<h2>Your cart is empty</h2>';
  } else {
    container.innerHTML = orderSummaryCode + allProductOrderCode;
  }

  // === 5. RE-ATTACH ALL LISTENERS (MOST IMPORTANT!) ===
  deleteButtonsEvent();
  deliveryRadiosEvent();
  updateQuantity()
}

// === DELETE BUTTONS ===
function deleteButtonsEvent() {
  document.querySelectorAll('.js-delete-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.index);
      deleteProduct(index);
      updateCheckout(); // ← re-renders + re-attaches listeners
    });
  });
}

// === DELIVERY RADIO BUTTONS ===
function deliveryRadiosEvent() {
  document.querySelectorAll('.js-delivery-option-input').forEach(radio => {
    // Listen for changes
    radio.addEventListener('change', () => {
      if (radio.checked) {
        shippingFeeCents = Number(radio.dataset.cost);
        updateCheckout(); // Re-render with new fee + correct radio stays checked
      }
    });

    // Set correct checked state based on current shippingFeeCents
    if (Number(radio.dataset.cost) === shippingFeeCents) {
      radio.checked = true;
    }
  });
}

// MAKING THE UPDATE BUTTON INTERACTIVE
function updateQuantity() {
  document.querySelectorAll('.js-update-btn').forEach((updateBtn, i) => {
    // Get the elements that belong to this product (same index)
    const quantityLabel = document.querySelectorAll('.quantity-label')[i];
    const quantityInput = document.querySelectorAll('.js-quantity-input')[i];
    const saveElement = document.querySelectorAll('.js-save-btn')[i];

    updateBtn.addEventListener('click', () => {
      // Hide the update button and old quantity
      updateBtn.remove();
      quantityLabel.remove();

      // Show input field and save button
      quantityInput.classList.add('quantity-input-on');
      saveElement.classList.add('save-quantity-link-on');

      // Focus the input
      quantityInput.focus();
      quantityInput.select();

      // === MAIN SAVE & VALIDATION FUNCTION ===
      function addUpdates() {
        let inputValue = quantityInput.value.trim();

        // Empty input
        if (inputValue === '') {
          alert("Please enter a quantity.");
          quantityInput.focus();
          return;
        }
        // Not a number
        if (isNaN(inputValue) || inputValue.includes('.')) {
          alert("Please enter a valid whole number.");
          quantityInput.focus();
          return;
        }
        const newQuantity = Number(inputValue);
        // Less than 1
        if (newQuantity < 1) {
          alert("Quantity cannot be less than 1.");
          quantityInput.focus();
          return;
        }
        // Greater than 1000
        if (newQuantity > 1000) {
          alert("Quantity cannot be greater than 1000.");
          quantityInput.focus();
          return;
        }

        // Save the quantity if it passes all tests
        cart.quantity[i] = newQuantity;
        cart.totalPrice[i] = newQuantity * cart.productPrice[i];
        addToStorage(); // Save to localStorage
        updateCheckout(); // Re-render everything
      }

      // SAVE ON CLICK
      saveElement.addEventListener('click', () => {
        addUpdates();
      });

      // SAVE ON ENTER KEY
      quantityInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          addUpdates();
        }
      });
    });
  });
}

// === FIRST LOAD ===
updateCheckout();

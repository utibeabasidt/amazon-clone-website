import { cart } from '../data/cart.js'


let allItemsQuantity = 0
let generalTotal = 0
let generalTotalTax = 0

function updateCheckout() {
  let allProductOrderCode = ``;
  for (let i = 0; i < cart.productIds.length; i++) { 
    let productId = cart.productIds[i];
    let productImage = cart.productImage[i]
    let productName = cart.productName[i];
    let productPrice = cart.productPrice[i];
    let quantity = cart.quantity[i];
    let totalPrice = cart.totalPrice[i];
    let eachProductOrderCode = `
      <div class="cart-item-container">
        <div class="delivery-date">Delivery date: Tuesday, June 21</div>

        <div class="cart-item-details-grid">
          <img
            class="product-image"
            src="${productImage}"
          />

          <div class="cart-item-details">
            <div class="product-name">
              ${productName}
            </div>
            <div class="product-price">$${productPrice}</div>
            <div class="product-quantity">
              <span> Quantity: <span class="quantity-label">${quantity}</span> </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-button">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input
                type="radio"
                checked
                class="delivery-option-input"
                name="delivery-option-1"
              />
              <div>
                <div class="delivery-option-date">Tuesday, June 21</div>
                <div class="delivery-option-price">FREE Shipping</div>
              </div>
            </div>
            <div class="delivery-option">
              <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-1"
              />
              <div>
                <div class="delivery-option-date">Wednesday, June 15</div>
                <div class="delivery-option-price">$4.99 - Shipping</div>
              </div>
            </div>
            <div class="delivery-option">
              <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-1"
              />
              <div>
                <div class="delivery-option-date">Monday, June 13</div>
                <div class="delivery-option-price">$9.99 - Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    allProductOrderCode += eachProductOrderCode
  }
  document.querySelector('.js-order-summary').innerHTML = allProductOrderCode;

  // adding interactivity to every delete button
  document.querySelectorAll('.js-delete-button').forEach((deleteBtn, i) => {
  deleteBtn.addEventListener('click', () => {
    cart.productIds.splice(i, 1);
    cart.productImage.splice(i, 1);
    cart.productName.splice(i, 1);
    cart.productPrice.splice(i, 1);
    cart.quantity.splice(i, 1);
    cart.totalPrice.splice(i, 1);

    // after deleting, update the cart both in local Storage and in the page
    let jsonString = JSON.stringify(cart)
    localStorage.setItem('cart', jsonString)
    updateCheckout();
  })
})
}

updateCheckout();


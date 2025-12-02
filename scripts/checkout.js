import { cart } from '../data/cart.js'

// function to add interactivity to every delete button
function deleteProduct () {
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

//function to update checkout
function updateCheckout() {
  let allProductOrderCode = ``; // to save both the order summary and the product list

  let totalQuantity = 0; // total of every quantity in the array
  let generalTotalPrice = 0; // total of every total price in the array
  let shippingFee = 0;
  let generalTotalBeforeTax = 0;
  let tax = 0;
  let orderTotal = 0;
  for (let i = 0; i < cart.productIds.length; i++) { 
    let productId = cart.productIds[i];
    let productImage = cart.productImage[i]
    let productName = cart.productName[i];
    let productPrice = cart.productPrice[i];
    let quantity = cart.quantity[i];
    let totalPrice = cart.totalPrice[i];
    generalTotalPrice += totalPrice;
    totalQuantity += quantity

    // update the product's lists
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

  // update the order summary
  generalTotalBeforeTax = generalTotalPrice + shippingFee;
  tax = generalTotalBeforeTax/100
  orderTotal = generalTotalBeforeTax + tax;

  let orderSummaryCode = `
    <div class="payment-summary">
      <div class="payment-summary-title">Order Summary</div>

      <div class="payment-summary-row">
        <div>Items (${totalQuantity}):</div>
        <div class="payment-summary-money">$${generalTotalPrice}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${shippingFee}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${generalTotalBeforeTax}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${tax}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${orderTotal}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
    </div>
  `
  if (allProductOrderCode === ``) {
    document.querySelector('.js-order-summary').innerHTML = `<h2>No Products Here</h2>` 
  } else {
    document.querySelector('.js-order-summary').innerHTML = orderSummaryCode + allProductOrderCode ;
  } 
  

  deleteProduct();
}

// First Loading
updateCheckout();
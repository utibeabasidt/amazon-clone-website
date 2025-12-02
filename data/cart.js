/// THIS SECTION HELPS US WITH ADDING AND UPDATING THE CART

export let cart = {
  productIds: [],
  productName: [],
  productPrice: [],
  quantity: [],
  totalPrice: []
}

// function add a product to cart, but has to check some conditions
export function addToCart(eachProductId, eachProductName, eachProductPrice, option) {
  // we check if the product id already exist in the cart (if it is, just update the cart, else, add a new product to the cart)
  let productIdAlreadyInCart = false;
  let positionInCart = 0;
  cart.productIds.forEach((productId, itemIndex)=> {
    if (eachProductId === productId) {
      productIdAlreadyInCart = true;
      positionInCart = itemIndex; // taking note of the index
    }
  })

  let totalPrice = eachProductPrice * option // getting the total price

  // Add or update the product in the cart
  if (productIdAlreadyInCart) {
    // Just add more quantity to the existing product
    cart.quantity[positionInCart] += option;
    cart.totalPrice[positionInCart] += totalPrice;
  } else {
    // Add as a new item in the cart
    cart.productIds.push(eachProductId);
    cart.productName.push(eachProductName)
    cart.productPrice.push(eachProductPrice)
    cart.quantity.push(option);
    cart.totalPrice.push(totalPrice);
  }

  getCartQuantity(); // get cart quantity
}

// function for getting the total quantity from the cart (best if it is in local storage)
export function getCartQuantity () {
  let cartQuantity = 0;
  cart.quantity.forEach((eachQuantity)=>{
    cartQuantity += eachQuantity
  })

  document.querySelector('.js-cart-quantity').innerText = cartQuantity // updating the page with the cart quantity
}
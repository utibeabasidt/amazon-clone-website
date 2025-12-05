/// THIS SECTION HELPS US WITH ADDING AND UPDATING THE CART

export let cart = JSON.parse(localStorage.getItem('cart')) || {
  productIds: [],
  productImage: [],
  productName: [],
  productPrice: [],
  quantity: [],
  totalPrice: []
}

// function to add to localStorage
export function addToStorage() {
  let jsonString = JSON.stringify(cart);
  localStorage.setItem('cart', jsonString)
}
  

// function add a product to cart, but has to check some conditions
export function addToCart(eachProductImage, eachProductId, eachProductName, eachProductPrice, option) {
  // we check if the product id already exist in the cart (if it is, just update the cart, else, add a new product to the cart)
  let productIdAlreadyInCart = false;
  let positionInCart = 0;
  cart.productIds.forEach((productId, itemIndex)=> {
    if (eachProductId === productId) {
      productIdAlreadyInCart = true;
      positionInCart = itemIndex; // taking note of the index
    }
  })

  // getting the total price
  let totalPrice = (eachProductPrice * option) * 100;
  totalPrice = totalPrice/100;

  // Add or update the product in the cart
  if (productIdAlreadyInCart) {
    // Just add more quantity to the existing product
    cart.quantity[positionInCart] += option;
    cart.totalPrice[positionInCart] += totalPrice;
  } else {
    // Add as a new item in the cart
    cart.productIds.push(eachProductId);
    cart.productImage.push(eachProductImage)
    cart.productName.push(eachProductName)
    cart.productPrice.push(eachProductPrice)
    cart.quantity.push(option);
    cart.totalPrice.push(totalPrice);
  }

  // adding to storage
  addToStorage()

  document.querySelector('.js-cart-quantity').innerText = getCartQuantity() // updating the page with the cart quantity
}

// function for getting the total quantity from the cart (best if it is in local storage)
export function getCartQuantity () {
  let cartQuantity = 0;
  cart.quantity.forEach((eachQuantity)=>{
    cartQuantity += eachQuantity
  })
  return cartQuantity;
}

// function to add interactivity to every delete button
export function deleteProduct (i) {
  cart.productIds.splice(i, 1);
  cart.productImage.splice(i, 1);
  cart.productName.splice(i, 1);
  cart.productPrice.splice(i, 1);
  cart.quantity.splice(i, 1);
  cart.totalPrice.splice(i, 1);
  addToStorage()
}
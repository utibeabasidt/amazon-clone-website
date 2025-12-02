/// THIS SECTION HELPS US IMPORT THE CART AND PRODUCTS SECTION, HELPS US HANDLE CART MESSAGE FUNCTIONALITY, AS WELL AS HELP US ADD AN EVENT TO THE ADD BUTTON

// Loading the Cart first before any other thing
import { cart, addToCart, getCartQuantity } from "../data/cart.js";

// Fetching the product data first before displaying it on the screen
import { products, displayProductsOnPage } from "../data/products.js";

// function to check if the timeout is still working even when another button is clicked again. if it is, cancel the former timeout and use the current
let isTimeoutWorking = false
let timeoutVariable;
function checkingTimeout (message) {
  if (!isTimeoutWorking) {
    // clear the timeout and start again
    clearTimeout(timeoutVariable);
    timeoutVariable = setTimeout (()=>{
      message.classList.remove('added-to-cart-on')
    }, 2000)
    isTimeoutWorking = true
  } else {
    // clear the timeout and start again
    clearTimeout(timeoutVariable)
    timeoutVariable = setTimeout (()=>{
      message.classList.remove('added-to-cart-on')
    }, 2000)
    isTimeoutWorking = false
  }
}

// display the products on the page before anything else
displayProductsOnPage();

// display the cart quantity on the page before anything else
getCartQuantity();

// invoking all the add to cart elements to make it interactive (using querySelectorAll because we have to loop through all the buttons, text and options to make them dynamic to their index)
let addBtns = document.querySelectorAll('.js-add-to-cart-btn');
let addedMsg = document.querySelectorAll('.js-added-to-cart-msg')

// looping though each buttons to add functionality
addBtns.forEach((addBtn, i) => {  
  addBtn.addEventListener('click', ()=>{
    // getting the product id and name from each button clicked
    let eachProductId = addBtn.dataset.productId
    let eachProductName = products.name[i] 
    let eachProductPrice = products.priceCents[i] / 100

    // Display message and animation
    addedMsg[i].classList.add('added-to-cart-on')
    checkingTimeout(addedMsg[i])

    // getting the value of the option for each product id index
    let selectElement = document.querySelector(`.js-select-for-${products.id[i]}`)
    let option = parseInt(selectElement.value) // changing the option of a specific index string to integer

    // adding product to cart
    addToCart(eachProductId, eachProductName, eachProductPrice, option)

    console.log(eachProductPrice)
    console.log(cart)
  })
})



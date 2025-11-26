// GENERATING THE PRODUCTS PAGE WITH JAVASCRIPT

let allProductsCode = ``; // to save all the html from each products

// looping through to get each of the information
for (let i = 0; i < products.name.length; i++) {
  let image = products.image[i];
  let name = products.name[i];
  let starsRating = products.ratings.stars[i];
  let countRating = products.ratings.count[i];
  let price = products.priceCents[i];
  //generating html code for each product information
  let eachProductCode = `
    <div class="product-container">
      <div class="product-image-container">
        <img
          class="product-image"
          src="${image}"
        />
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${name}
      </div>

      <div class="product-rating-container">
        <img
          class="product-rating-stars"
          src="images/ratings/rating-${starsRating * 10}.png"
        />
        <div class="product-rating-count link-primary">${countRating}</div>
      </div>

      <div class="product-price">$${(price / 100).toFixed(2)}</div>

      <div class="product-quantity-container">
        <select id="js-select">
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-msg">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart-btn">Add to Cart</button>
    </div>
  `
  // adding each product html to the products html
  allProductsCode += eachProductCode
  
}

// displaying it in the web page
document.querySelector('.js-products-grid').innerHTML = allProductsCode
console.log(allProductsCode)

// storing cart quantity
let cartQuantity = 0;

// invoking all the add to cart elements to make it interactive (using querySelectorAll because we have to loop through all the buttons, text and options to make them dynamic to their index)
let addBtns = document.querySelectorAll('.js-add-to-cart-btn');
let addedMsg = document.querySelectorAll('.js-added-to-cart-msg')
addBtns.forEach((addBtn, i) => {
  addBtn.addEventListener('click', ()=>{
    // Display message for two seconds
    addedMsg[i].classList.add('added-to-cart-on')
    setTimeout (()=>{
      addedMsg[i].classList.remove('added-to-cart-on')
    }, 1500)

    // getting the value of the option for each index
    let selectElement = document.querySelectorAll('#js-select')
    let option = parseInt(selectElement[i].value) // changing the option of a specific index string to integer
    cartQuantity += option

    // updating the cart
    cart.productName.push(products.name[i])
    cart.quantity.push(cartQuantity)

    console.log(cart)

    // updating the page
    document.querySelector('.js-cart-quantity').innerText = cartQuantity
  })
})
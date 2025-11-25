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
        <select>
          <option selected value="1">1</option>
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

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button class="add-to-cart-button button-primary">Add to Cart</button>
    </div>
  `
  // adding each product html to the products html
  allProductsCode += eachProductCode
}

// displaying it in the web page
document.querySelector('.js-products-grid').innerHTML = allProductsCode
console.log(allProductsCode)
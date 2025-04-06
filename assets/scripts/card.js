const createCard = (product) => {
  const card = document.createElement("div");
  card.setAttribute("id", product.name);
  card.classList.add("product-card");
  card.innerHTML = `<img src=${product.img} alt="${product} image" class="product-image" />
    <button class="add-to-cart">
      <img class="cart-icon" src="./assets/images/icon-add-to-cart.svg" alt="Shopping cart icon" />
      <span>Add to cart</span>
    </button>
    <div class="product-details">
      <p class="type">${product.type}</p>
      <p class="name">${product.name}</p>
      <p class="price">$${product.price}</p>
    </div>`;
  return card;
};

export default createCard;

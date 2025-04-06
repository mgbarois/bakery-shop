import createCartItem from "./cartItem.js";
const productCards = document.querySelectorAll(".product-card");
const cartDiv = document.querySelector("#cart");

productCards.forEach((productCard) => {
  const addBtn = productCard.querySelector(".add-to-cart");
  addBtn.addEventListener("click", () => toggleCartButton(addBtn));
});

const toggleCartButton = (addBtn) => {
  const productCard = addBtn.parentElement;
  const productName = productCard.getAttribute("id");
  const productPrice = productCard
    .querySelector(".price")
    .innerText.replace("$", "");

  let productQuantity = 1;

  updateCart(productName, productQuantity, productPrice);

  // Replace button content with increment functionality
  productCard.classList.add("selected");

  const addBtnContainer = document.createElement("div");
  addBtnContainer.classList.add("add-to-cart-controls");

  const decrementBtn = document.createElement("button");
  decrementBtn.innerHTML = `<img src="./assets/images/icon-decrement-quantity.svg" alt="Decrement quantity"/>`;
  decrementBtn.addEventListener("click", () => {
    productQuantity--;
    quantitySpan.innerText = productQuantity;
    updateCart(productName, productQuantity, productPrice);
  });

  const incrementBtn = document.createElement("button");
  incrementBtn.innerHTML = `<img src="./assets/images/icon-increment-quantity.svg" alt="Increment quantity"/>`;
  incrementBtn.addEventListener("click", () => {
    productQuantity++;
    quantitySpan.innerText = productQuantity;
    updateCart(productName, productQuantity, productPrice);
  });

  const quantitySpan = document.createElement("span");
  quantitySpan.innerText = productQuantity;

  addBtnContainer.append(decrementBtn);
  addBtnContainer.append(quantitySpan);
  addBtnContainer.append(incrementBtn);

  addBtn.replaceWith(addBtnContainer);
};

const updateCart = (productName, productQuantity, productPrice) => {
  if (productQuantity < 1) {
    removeProductFromCart(productName);
  } else {
    const itemSummary = document.querySelector("#products-in-cart");
    const existingCartItemDiv = getCartItemDiv(productName);

    if (!existingCartItemDiv) {
      // Create new cart item if it does not yet exist
      const newCartItemDiv = createCartItem(productName, productQuantity);

      const removeItemBtn = createRemoveBtn(productName, newCartItemDiv);
      newCartItemDiv.append(removeItemBtn);
      itemSummary.append(newCartItemDiv);
    } else {
      // Otherwise, update existing item
      existingCartItemDiv.querySelector(
        ".cart-item-quantity"
      ).innerHTML = `${productQuantity}x`;
      existingCartItemDiv.querySelector(
        ".cart-item-total-price"
      ).innerHTML = `$${parseFloat(
        parseFloat(productPrice) * productQuantity
      ).toFixed(2)}`;
    }

    // Update cart totals
    setCartTotalAmount();
    setCartTotalQuantity();
  }
};

const getCartItemDiv = (productName) => {
  const cartItemDivs = document.querySelectorAll(".cart-product");
  const itemList = Array.from(cartItemDivs);
  return itemList.find((item) => item.getAttribute("id") == productName);
};

const createRemoveBtn = (productName) => {
  const removeButton = document.createElement("div");
  removeButton.classList.add("remove-from-cart");
  removeButton.innerHTML = `<button type="button"><img src="./assets/images/icon-remove-item.svg" alt="Remove"></button>`;
  removeButton.addEventListener("click", () => {
    removeProductFromCart(productName);
  });
  return removeButton;
};

const removeProductFromCart = (productName) => {
  // Remove item from cart
  const cartItemDiv = getCartItemDiv(productName);
  cartItemDiv.remove();

  // Reset corresponding product card
  productCards.forEach((productCard) => {
    if (productCard.getAttribute("id") == productName) {
      productCard.classList.remove("selected");
      const addControls = productCard.querySelector(".add-to-cart-controls");
      const addBtn = document.createElement("button");
      addBtn.classList.add("add-to-cart");
      addBtn.innerHTML = `
      <img class="cart-icon" src="./assets/images/icon-add-to-cart.svg" alt="Shopping cart icon" />
      <span>Add to cart</span>`;
      addBtn.addEventListener("click", () => toggleCartButton(addBtn));
      addControls.replaceWith(addBtn);
    }
  });

  // Update cart totals
  setCartTotalAmount();
  setCartTotalQuantity();
};

const setCartTotalAmount = () => {
  const totalDiv = document.querySelector("#total-amount");
  const itemTotals = Array.from(
    document.querySelectorAll(".cart-item-total-price")
  );
  const total = itemTotals
    .reduce((acc, curr) => {
      return acc + parseFloat(curr.innerText.replace("$", ""));
    }, 0.0)
    .toFixed(2);
  totalDiv.innerText = `$${total}`;
};

const setCartTotalQuantity = () => {
  const quantitySpan = document.querySelector("#total-quantity");
  const itemQuantities = Array.from(
    document.querySelectorAll(".cart-item-quantity")
  );
  const totalQuantity = itemQuantities.reduce((acc, curr) => {
    return acc + parseInt(curr.innerText.replace("x", ""));
  }, 0.0);
  quantitySpan.innerText = totalQuantity;
  if (totalQuantity === 0 && !cartDiv.classList.contains("empty"))
    cartDiv.classList.add("empty");
  if (totalQuantity > 0 && cartDiv.classList.contains("empty"))
    cartDiv.classList.remove("empty");
};

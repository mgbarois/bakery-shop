import products from "./products.js";

const createCartItem = (productName, productQuantity, productPrice) => {
  const product = products.find((product) => {
    return product.name === productName;
  });

  const price = product.price;
  const totalPrice = parseFloat(parseFloat(price) * productQuantity).toFixed(2);

  const newCartItemDiv = document.createElement("div");
  newCartItemDiv.classList.add("cart-product");
  newCartItemDiv.setAttribute("id", productName);

  newCartItemDiv.innerHTML = `
    <div class="cart-item-details">
        <img class="cart-item-image" src="${product.img}" alt="${productName}">
        <div class="cart-item-name">${productName}</div>
        <div class="cart-item-pricing">
          <span class="cart-item-quantity">${productQuantity}x</span>
          <span class="cart-item-price">$${product.price}</span>
          <span class="cart-item-total-price">$${totalPrice}</span>
        </div>
    </div>`;
  return newCartItemDiv;
};
export default createCartItem;

// Get the modal
var modal = document.querySelector("#order-confirmed-modal");

const modalContentDiv = modal.querySelectorAll(".modal-content")[0];

const modalOrderSummaryDiv = modal.querySelectorAll(".order-summary")[0];

// Get the button that opens the modal
var confirmOrderBtn = document.querySelector("#confirm-order");

// Get the <span> element that closes the modal
var closeSpan = document.querySelectorAll(".close")[0];

// When the user clicks on the button, open the modal
confirmOrderBtn.onclick = function () {
  modal.style.display = "block";

  // Retrieve items in cart
  const cartProductDivs = document.querySelectorAll(
    "#products-in-cart .cart-item-details"
  );
  const cartTotalDiv = document.querySelector("#total-amount");

  // Create order confirmation item summary
  const modalProductsDiv = document.createElement("div");
  modalProductsDiv.classList.add("products-in-cart");

  // Clone cart items in order confirmation modal
  cartProductDivs.forEach((item) => {
    const newCartItemDiv = document.createElement("div");
    newCartItemDiv.classList.add("cart-product", "modal-summary");
    const itemClone = item.cloneNode(true);
    newCartItemDiv.append(itemClone);

    const price = newCartItemDiv.querySelectorAll(".cart-item-price")[0];
    const itemPriceDiv = document.createElement("div");
    itemPriceDiv.classList.add("modal-item-price");
    itemPriceDiv.innerText = price.innerText;

    newCartItemDiv.append(itemPriceDiv);
    modalProductsDiv.append(newCartItemDiv);
  });

  const modalTotalDiv = document.createElement("div");
  modalTotalDiv.classList.add("order-total");
  modalTotalDiv.innerHTML = `
        <div>Order total:</div>
        <div class="total-amount">${cartTotalDiv.innerText}</div>`;

  modalOrderSummaryDiv.append(modalProductsDiv);
  modalOrderSummaryDiv.append(modalTotalDiv);
};

// When the user clicks on <span> (x), close the modal
closeSpan.onclick = function () {
  modal.style.display = "none";
  modalOrderSummaryDiv.innerHTML = "";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalOrderSummaryDiv.innerHTML = "";
  }
};

// $(document).ready(function() {
//   $('.navbar-nav .nav-link').click(function() {
//     $('.navbar-nav .nav-item').removeClass('active');
//     $(this).parent().addClass('active');
//   });
// });

// function showBuyingUI(productName, productPrice, flavorImageSrc) {
//   document.getElementById('productName').innerText = 'Product Name: ' + productName;
//   document.getElementById('productPrice').innerText = 'Price: ₱' + productPrice.toFixed(2);
//   document.getElementById('flavorImage').src = flavorImageSrc;
//   document.getElementById('buyingUI').style.display = 'block';
// }

// function closeBuyingUI() {
//   document.getElementById('buyingUI').style.display = 'none';
// }

// function addToCart() {
//   alert('Product added to cart!');
//   closeBuyingUI();
//   document.getElementById('viewCartBtn').style.display = 'block';
// }

// function showCart() {
//   var cart = document.getElementById('cart');
//   if (cart) {
//       if (cart.style.display === 'none') {
//           cart.style.display = 'block';
//       } else {
//           cart.style.display = 'none';
//       }
//   } else {
//       console.error("Element with ID 'cart' not found.");
//   }
// }

let cart = [];

function showBuyingUI(name, price, imgSrc) {
  document.getElementById('productName').textContent = name;
  document.getElementById('productPrice').textContent = `Price: $${price.toFixed(2)}`;
  document.getElementById('flavorImage').src = imgSrc;
  document.getElementById('quantity').value = 1;
  document.getElementById('buyingUI').style.display = 'block';
}

function closeBuyingUI() {
  document.getElementById('buyingUI').style.display = 'none';
}

function addToCart() {
  const name = document.getElementById('productName').textContent;
  const price = parseFloat(document.getElementById('productPrice').textContent.replace('Price: $', ''));
  const quantity = parseInt(document.getElementById('quantity').value);
  
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }
  closeBuyingUI();
  updateCartModal();
}

function updateCartModal() {
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('totalPrice').textContent = '';
    return;
  }

  let totalPrice = 0;

  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <span class="item-name">${item.name}</span>
      <span class="item-quantity">Quantity: ${item.quantity}</span>
      <span class="item-price">Price: $${(item.price * item.quantity).toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">Delete</button>
    `;
    cartItemsContainer.appendChild(itemElement);

    totalPrice += item.price * item.quantity;
  });

  document.getElementById('totalPrice').textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartModal();
}

function showCart() {
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();
}
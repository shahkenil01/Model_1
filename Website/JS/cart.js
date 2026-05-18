
function getCart() {
  var raw = localStorage.getItem('cart');
  return raw ? JSON.parse(raw) : [];
}


function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}


function addToCart(name, price, imgSrc) {
  var cart = getCart();


  var found = false;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].qty = cart[i].qty + 1;
      found = true;
      break;
    }
  }

  if (!found) {
   
    var cleanPrice = String(price).replace(/[₹,]/g, '').trim();
    cart.push({ name: name, price: parseFloat(cleanPrice) || 0, img: imgSrc, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
  showCartToast(name);
}


function updateCartCount() {
  var cart  = getCart();
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].qty;
  }

 
  var countEl = document.querySelector('.count');
  if (countEl) {
    countEl.textContent = total;
  }
}


function showCartToast(productName) {

  var old = document.getElementById('cartToast');
  if (old) old.remove();

  var toast = document.createElement('div');
  toast.id = 'cartToast';
  toast.innerHTML = '🛒 <strong>' + productName + '</strong> added to cart!';
  toast.style.cssText = [
    'position:fixed',
    'bottom:28px',
    'right:24px',
    'background:#6d4aae',
    'color:#fff',
    'padding:12px 20px',
    'border-radius:8px',
    'font-size:14px',
    'font-family:Lato,Arial,sans-serif',
    'box-shadow:0 4px 16px rgba(0,0,0,0.18)',
    'z-index:9999',
    'transition:opacity 0.4s',
    'opacity:1'
  ].join(';');

  document.body.appendChild(toast);

  setTimeout(function () {
    toast.style.opacity = '0';
    setTimeout(function () { toast.remove(); }, 400);
  }, 2500);
}

// ============================================================
//  CART PAGE  —  call renderCartPage() on Cart.html
// ============================================================
function renderCartPage() {
  var cart    = getCart();
  var tbody   = document.getElementById('cartTableBody');
  var emptyMsg = document.getElementById('cartEmpty');
  var cartBox  = document.getElementById('cartBox');
  var countSpan = document.getElementById('cartItemCount');

  if (!tbody) return;

  if (cart.length === 0) {
    if (emptyMsg)  emptyMsg.style.display = 'block';
    if (cartBox)   cartBox.style.display  = 'none';
    if (countSpan) countSpan.textContent  = '0';
    return;
  }

  if (emptyMsg)  emptyMsg.style.display = 'none';
  if (cartBox)   cartBox.style.display  = '';

  if (countSpan) countSpan.textContent = cart.length;

  // Build rows
  tbody.innerHTML = '';
  for (var i = 0; i < cart.length; i++) {
    (function (item, index) {
      var row = document.createElement('tr');
      row.innerHTML =
        '<td>' +
          '<div class="cartItemimgWrapper">' +
            '<div class="imgWrapper">' +
              '<img src="' + (item.img || '') + '" alt="' + item.name + '" style="width:80px;height:80px;object-fit:cover;border-radius:6px"/>' +
            '</div>' +
            '<div class="info"><h6>' + item.name + '</h6></div>' +
          '</div>' +
        '</td>' +
        '<td>₹' + item.price + '</td>' +
        '<td>' +
          '<div class="quantity-box">' +
            '<button class="qty-btn" onclick="changeCartQty(' + index + ', -1)">−</button>' +
            '<span class="qty-value">' + item.qty + '</span>' +
            '<button class="qty-btn" onclick="changeCartQty(' + index + ', 1)">+</button>' +
          '</div>' +
        '</td>' +
        '<td class="subtotal-cell">₹' + (item.price * item.qty) + '</td>' +
        '<td><span class="remove" onclick="removeFromCart(' + index + ')" style="cursor:pointer;color:#ea2b0f;font-size:20px;">' +
          '<i class="fas fa-times"></i>' +
        '</span></td>';
      tbody.appendChild(row);
    })(cart[i], i);
  }

  recalcCart();
}

// ----- Change qty in cart page -----
function changeCartQty(index, delta) {
  var cart = getCart();
  if (!cart[index]) return;

  cart[index].qty += delta;
  if (cart[index].qty < 1) cart[index].qty = 1;

  saveCart(cart);
  renderCartPage();
  updateCartCount();
}

// ----- Remove item from cart -----
function removeFromCart(index) {
  var cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCartPage();
  updateCartCount();
}

// ----- Recalc totals on cart page -----
function recalcCart() {
  var cart     = getCart();
  var subtotal = 0;

  for (var i = 0; i < cart.length; i++) {
    subtotal += cart[i].price * cart[i].qty;
  }

  var gst      = Math.round((subtotal * 12) / 100);
  var delivery = subtotal > 0 ? 45 : 0;
  var total    = subtotal + gst + delivery;

  var spans = document.querySelectorAll('.cart-row span:last-child');
  if (spans[0]) spans[0].textContent = '₹' + subtotal;
  if (spans[1]) spans[1].textContent = '₹' + gst;
  if (spans[2]) spans[2].textContent = '₹' + delivery;
  if (spans[3]) spans[3].textContent = '₹' + total;

  // Save totals to pass to payment page
  localStorage.setItem('checkoutTotal', total);
}

// ----- Go to checkout -----
function goToCheckout() {
  var cart = getCart();
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  window.location.href = '/Website/Payment.html';
}

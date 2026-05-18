

// ----- SIGNUP -----
function handleSignUp(event) {
  event.preventDefault();

  var name     = document.getElementById('name').value.trim();
  var phone    = document.getElementById('phone').value.trim();
  var email    = document.getElementById('email').value.trim();
  var password = document.getElementById('password').value.trim();

  // Basic validations
  if (!name || name.length < 3) {
    alert('Name must be at least 3 characters');
    return;
  }
  if (!/^[0-9]{10}$/.test(phone)) {
    alert('Please enter a valid 10-digit phone number');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email');
    return;
  }
  if (password.length < 6) {
    alert('Password must be at least 6 characters');
    return;
  }

  // Save user to localStorage
  var user = { name: name, phone: phone, email: email, password: password };
  localStorage.setItem('user', JSON.stringify(user));

  // Mark as logged in
  localStorage.setItem('loggedIn', 'true');
  localStorage.setItem('loggedInName', name);

  alert('Account created! Welcome, ' + name + ' 🎉');
  window.location.href = 'index.html';
}

// ----- SIGNIN -----
function handleSignIn(event) {
  event.preventDefault();

  var email    = document.getElementById('email').value.trim();
  var password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }

  // Get stored user
  var stored = localStorage.getItem('user');
  if (!stored) {
    alert('No account found! Please Sign Up first.');
    return;
  }

  var user = JSON.parse(stored);

  if (user.email !== email || user.password !== password) {
    alert('Wrong email or password!');
    return;
  }

  // Login success
  localStorage.setItem('loggedIn', 'true');
  localStorage.setItem('loggedInName', user.name);

  alert('Welcome back, ' + user.name + '! 👋');
  window.location.href = 'index.html';
}

// ----- LOGOUT -----
function logout() {
  localStorage.setItem('loggedIn', 'false');
  localStorage.removeItem('loggedInName');
  window.location.href = 'index.html';
}

// ----- HEADER UPDATE  (call this after header loads) -----
// This replaces Sign In button & sidebar links based on login state
function updateHeaderUI() {
  var isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  var userName   = localStorage.getItem('loggedInName') || '';

  // ---- Top header: Sign In btn -> name button ----
  var signInBtn = document.querySelector('.part3 .btn-blue');
  if (signInBtn) {
    if (isLoggedIn) {
      signInBtn.textContent = '👤 ' + userName;
      signInBtn.onclick = function () {
        window.location.href = 'MyProfile.html';
      };
    } else {
      signInBtn.textContent = 'Sign In';
      signInBtn.onclick = function () {
        window.location.href = 'SignIn.html';
      };
    }
  }


  var sidebar = document.querySelector('.sidebarNav ul');
  if (!sidebar) return;

  if (isLoggedIn) {

    sidebar.querySelectorAll('li').forEach(function (li) {
      var text = li.textContent.trim().toLowerCase();
      if (text === 'login' || text === 'sign up') {
        li.remove();
      }
    });

    // Add My Profile if not already there
    if (!sidebar.querySelector('a[href*="MyProfile"]')) {
      var profileLi = document.createElement('li');
      profileLi.innerHTML = '<a href="/Website/MyProfile.html"><i class="fa-solid fa-user"></i> My Profile (' + userName + ')</a>';
      sidebar.insertBefore(profileLi, sidebar.firstChild);
    }

    // Add Order History if not already there
    if (!sidebar.querySelector('a[href*="OrderHistory"]')) {
      var orderLi = document.createElement('li');
      orderLi.innerHTML = '<a href="/Website/OrderHistory.html"><i class="fa-solid fa-clock-rotate-left"></i> Order History</a>';
      sidebar.insertBefore(orderLi, sidebar.children[1] || null);
    }

    // Add Logout if not already there
    if (!sidebar.querySelector('.logout-btn')) {
      var logoutLi = document.createElement('li');
      logoutLi.innerHTML = '<a href="#" class="logout-btn" style="color:#ea2b0f;" onclick="logout()"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>';
      sidebar.appendChild(logoutLi);
    }

  } else {
    // Make sure Login & Sign Up are shown (remove profile/logout if any)
    sidebar.querySelectorAll('li').forEach(function (li) {
      var text = li.textContent.trim().toLowerCase();
      if (text.includes('my profile') || text.includes('order history') || text.includes('logout')) {
        li.remove();
      }
    });
  }
}

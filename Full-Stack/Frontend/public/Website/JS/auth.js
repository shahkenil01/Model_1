const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'https://model-1-775m.onrender.com';

function saveSession(email) {
  localStorage.setItem('userEmail', email);
}

function getSession() {
  return localStorage.getItem('userEmail');
}

function clearSession() {
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userCache');
}

function cacheUser(user) {
  localStorage.setItem('userCache', JSON.stringify(user));
}

function getCachedUser() {
  try {
    return JSON.parse(localStorage.getItem('userCache'));
  } catch {
    return null;
  }
}

// ─── FETCH LOGGED-IN USER ───
async function getLoggedInUser() {
  const email = getSession();
  if (!email) return null;

  // Use cache first for speed
  const cached = getCachedUser();
  if (cached && cached.email === email) return cached;

  try {
    const res = await fetch(
      `${API_URL}/api/users/email/${encodeURIComponent(email)}`,
    );
    const data = await res.json();
    if (data.success && data.user) {
      cacheUser(data.user);
      return data.user;
    }
  } catch (err) {
    console.error('Failed to fetch user:', err);
  }
  return null;
}

async function updateHeaderUI() {
  const user = await getLoggedInUser();

  const authBtn = document.getElementById('authBtn');
  const menuLogin = document.getElementById('menuLogin');
  const menuSignup = document.getElementById('menuSignup');
  const menuProfile = document.getElementById('menuProfile');
  const menuOrders = document.getElementById('menuOrders');
  const menuLogout = document.getElementById('menuLogout');

  if (!authBtn) return;

  if (user) {
    const firstName = user.name.split(' ')[0];
    authBtn.textContent = '👤 ' + firstName;
    
    if (menuLogin) menuLogin.style.display = 'none';
    if (menuSignup) menuSignup.style.display = 'none';
    if (menuProfile) menuProfile.style.display = '';
    if (menuOrders) menuOrders.style.display = '';
    if (menuLogout) menuLogout.style.display = '';

    const menuAdminUsers = document.getElementById('menuAdminUsers');
    if (menuAdminUsers) {
      menuAdminUsers.style.display = user.isAdmin ? '' : 'none';
    }
  } else {
    authBtn.textContent = 'Sign In';
    if (menuLogin) menuLogin.style.display = '';
    if (menuSignup) menuSignup.style.display = '';
    if (menuProfile) menuProfile.style.display = 'none';
    if (menuOrders) menuOrders.style.display = 'none';
    if (menuLogout) menuLogout.style.display = 'none';
  }
}

// ─── HEADER AUTH BUTTON CLICK ────────
function headerAuthClick() {
  const email = getSession();
  if (email) {
    window.location.href = '/Website/MyProfile.html';
  } else {
    window.location.href = '/Website/SignIn.html';
  }
}

// ─── LOGOUT ─────────
function logout() {
  clearSession();
  window.location.href = '/Website/index.html';
}

// ─── SIGNUP ──────────────────────────────────────────────────────────────────
async function handleSignUp(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

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

  try {
    const res = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, password }),
    });

    const data = await res.json();

    if (data.success) {
      saveSession(data.user.email);
      cacheUser(data.user);
      alert('Account created successfully!');
      window.location.href = '/Website/index.html';
    } else {
      alert(data.message || 'Signup failed');
    }
  } catch (err) {
    console.error(err);
    alert('Registration Failed. Please check your connection.');
  }
}

// ─── SIGNIN ─────────
async function handleSignIn(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const res = await fetch(
      `${API_URL}/api/users/email/${encodeURIComponent(email)}`,
    );
    const data = await res.json();

    if (data.success && data.user) {
      if (data.user.password !== password) {
        alert('Invalid email or password');
        return;
      }
      saveSession(data.user.email);
      cacheUser(data.user);
      alert('Signed in successfully!');
      window.location.href = '/Website/index.html';
    } else {
      alert('No account found with this email');
    }
  } catch (err) {
    console.error(err);
    alert('Sign in failed. Please check your connection.');
  }
}

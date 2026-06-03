function initStickyNav() {
  var nav = document.querySelector('.navigation');
  if (!nav) return;

  var placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) {
    placeholder = document.createElement('div');
    placeholder.id = 'nav-placeholder';
    placeholder.style.display = 'none';
    nav.parentNode.insertBefore(placeholder, nav.nextSibling);
  }

  function handleScroll() {
    if (window.scrollY > 50) {
      if (!nav.classList.contains('nav-fixed')) {
        nav.classList.add('nav-fixed');
        placeholder.style.display = 'block';
      }
    } else {
      if (nav.classList.contains('nav-fixed')) {
        nav.classList.remove('nav-fixed');
        placeholder.style.display = 'none';
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

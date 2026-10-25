const header = document.querySelector('.header');
const menuLinks = document.querySelectorAll('.header__link');
const burgerBtn = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');

const setMenuOpen = (isOpen) => {
  if (!burgerBtn || !headerMenu) return;
  burgerBtn.classList.toggle('header__burger--active', isOpen);
  headerMenu.classList.toggle('header__menu--active', isOpen);
  document.body.classList.toggle('is-menu-open', isOpen);
  burgerBtn.setAttribute('aria-expanded', String(isOpen));
  burgerBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
};

if (header) {
  const updateHeader = () => header.classList.toggle('header--scrolled', window.scrollY > 10);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
menuLinks.forEach(link => {
  const linkPage = link.getAttribute('href').split('#')[0];
  if (linkPage && linkPage !== 'index.html' && linkPage === currentPage) {
    link.classList.add('is-link-active');
    link.setAttribute('aria-current', 'page');
  }

  link.addEventListener('click', () => setMenuOpen(false));
});

if (burgerBtn && headerMenu) {
  burgerBtn.addEventListener('click', () => {
    setMenuOpen(!headerMenu.classList.contains('header__menu--active'));
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  setMenuOpen(false);
  document.querySelectorAll('.top__box').forEach(box => box.classList.remove('is-active'));
});

document.addEventListener('click', (e) => {
  const dotBtn = e.target.closest('.top__dot-btn');
  const allBoxes = document.querySelectorAll('.top__box');
  if (dotBtn) {
    const currentBox = dotBtn.closest('.top__box');
    const isActive = currentBox.classList.contains('is-active');
    allBoxes.forEach(box => box.classList.remove('is-active'));
    if (!isActive) {
      currentBox.classList.add('is-active');
    }
  } else if (!e.target.closest('.top__tooltip')) {
    allBoxes.forEach(box => box.classList.remove('is-active'));
  }
});

const seeAllBtn = document.querySelector('.popular__link-all');
const hiddenCards = document.querySelectorAll('.popular__card--hidden');
if (seeAllBtn && hiddenCards.length > 0) {
  seeAllBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const isExpanded = seeAllBtn.getAttribute('aria-expanded') === 'true';
    hiddenCards.forEach(card => card.classList.toggle('popular__card--hidden', isExpanded));
    seeAllBtn.textContent = isExpanded ? 'See All' : 'Show Less';
    seeAllBtn.setAttribute('aria-expanded', String(!isExpanded));
  });
}

const popularCards = document.querySelectorAll('.popular__card');
popularCards.forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();

    const currentActiveCard = document.querySelector('.popular__card--active');
    if (currentActiveCard) {
      currentActiveCard.classList.remove('popular__card--active');
    }
    card.classList.add('popular__card--active');
  });
});

const catalogToggle = document.querySelector('.catalog-products__top');
const catalogSection = document.querySelector('.catalog-products');
if (catalogToggle && catalogSection) {
  catalogToggle.addEventListener('click', () => {
    const isCollapsed = catalogSection.classList.toggle('is-collapsed');
    catalogToggle.setAttribute('aria-expanded', String(!isCollapsed));
  });
}

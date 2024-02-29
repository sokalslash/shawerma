const navMenu = document.querySelector('.header__nav');
const burgerBtn = document.querySelector('.nav-toggle');
const body = document.querySelector('.body');
const basketContent = document.querySelector('.basket-content');

burgerBtn.addEventListener('click', () => {
  navMenu.classList.toggle('header__nav--active');
  burgerBtn.classList.toggle('active');
  body.classList.toggle('nav-menu-open');
  if (!basketContent.classList.contains('hide')) {
    basketContent.classList.add('hide')
  }
})

navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('header__nav--active');
    burgerBtn.classList.remove('active');
    body.classList.remove('nav-menu-open');
  })
})
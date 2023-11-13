const navMenu = document.querySelector('.header__nav');
const burgerBtn = document.querySelector('.nav-toggle');
const burgerBasketIcons = document.querySelector('.basket-icons');
const body = document.querySelector('.body');

burgerBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  burgerBtn.classList.toggle('active');
  burgerBasketIcons.classList.toggle('hide');
  body.classList.toggle('nav-menu-open');
})

navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    burgerBtn.classList.remove('active');
    body.classList.remove('nav-menu-open');
  })
})
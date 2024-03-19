const navList = document.querySelector('.nav__list');
const arrowUp = document.querySelector('.up-arrow');
const basket = document.querySelector('.basket-content');

function fix100vh() {
    let vh = document.documentElement.clientHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  function findHeight() {
    let fullHeight = document.documentElement.clientHeight;
  
    if (fullHeight < 320) {
      navList.classList.add('nav__list--low-screen');
      arrowUp.classList.add('no-full');
      basket.classList.add('header__basket-content--low-screen');
    } else {
      if (navList.classList.contains('nav__list--low-screen')) {
        navList.classList.remove('nav__list--low-screen');
        arrowUp.classList.remove('no-full');
        basket.classList.remove('header__basket-content--low-screen');
      }
    }
  }

  export { fix100vh, findHeight };
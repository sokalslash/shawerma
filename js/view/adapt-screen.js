const navList = document.querySelector('.nav__list');
const arrowUp = document.querySelector('.arrow-wrapper');

function fix100vh() {
    let vh = document.documentElement.clientHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  function findHeight() {
    let fullHeight = document.documentElement.clientHeight;
  
    if (fullHeight < 320) {
      navList.classList.add('nav__list--low-screen');
      arrowUp.classList.add('no-full')
    } else {
      if (navList.classList.contains('nav__list--low-screen')) {
        navList.classList.remove('nav__list--low-screen');
        arrowUp.classList.remove('no-full');
      }
    }
  }

  export { fix100vh, findHeight };
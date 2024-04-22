const header = document.querySelector('.header');
const logoButton = document.querySelector('.logo-button__img');

const findCurrentScroll = () => window.pageYOffset;
const findHideClass = () => header.classList.contains('header--hidden');

logoButton.addEventListener('click', () => header.classList.remove('header--hidden'));

let lastScroll = 0;

function addStickyHeader() {
  if (findCurrentScroll() > lastScroll && !findHideClass()) {
    header.classList.add('header--hidden');
  } else if (findCurrentScroll() < lastScroll && findHideClass()){
    header.classList.remove('header--hidden');
  }
  lastScroll = findCurrentScroll();
}

export { addStickyHeader };

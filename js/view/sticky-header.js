const header = document.querySelector('.header');
const logoButton = document.querySelector('.logo-button__img');

const findCurrentScroll = () => window.pageYOffset;
const findHideClass = () => header.classList.contains('hide');

logoButton.addEventListener('click', () => header.classList.remove('hide'));

let lastScroll = 0;

function addStickyHeader() {
  if (findCurrentScroll() > lastScroll && !findHideClass()) {
    header.classList.add('hide');
  } else if (findCurrentScroll() < lastScroll && findHideClass()){
    header.classList.remove('hide');
  }
  lastScroll = findCurrentScroll();
}

export { addStickyHeader };
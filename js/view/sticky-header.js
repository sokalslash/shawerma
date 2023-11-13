const header = document.querySelector('.header');

const findCurrentScroll = () => window.pageYOffset;
const findHideClass = () => header.classList.contains('hide');

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
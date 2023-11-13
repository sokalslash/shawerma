import { handleGoodsCardChange } from '../presenter/page-presenter.js';

const shawarmaCardsEl = document.querySelectorAll('.shawarma__item');
const burgerSectionEl = document.querySelector('.burgers__list');
const snackSectionEl = document.querySelector('.snacks__list');
const drinkSectionEl = document.querySelector('.drinks__list');

const goodsCountElCollection = document.querySelectorAll('.count');
const intoBasketElCollection = document.querySelectorAll('.into-basket-button');
const plusMinusBlockElCollection = document.querySelectorAll('.plus-minus');

function returnOriginalPageState() {
  console.log('чистим страницу (корзина должна быть уже очищена)');
  goodsCountElCollection.forEach((el) => el.value = 0);
  intoBasketElCollection.forEach((el) => el.classList.remove('hide'));
  plusMinusBlockElCollection.forEach((el) => el.classList.add('hide'));
};

function goodsCardChangeHandler(event) {
  if (event.target.nodeName === 'BUTTON') {
    const chosenProduct = event.target.parentNode.dataset.id ?? event.target.parentNode.parentNode.dataset.id;
    handleGoodsCardChange(event.target.classList[0], event.currentTarget.id, chosenProduct);
  }
};

function shawarmaCardChangeHandler(e) {
  if (e.target.nodeName === 'BUTTON') {
    if (e.target.classList.contains('shawarma__size')) {
      const sizeCollection = e.currentTarget.querySelectorAll('.shawarma__size');
      sizeCollection.forEach((size) => size.classList.remove('shawarma__size--bright'));
      e.target.classList.add('shawarma__size--bright');
      handleGoodsCardChange(e.target.classList[0], e.currentTarget.id, e.target.dataset.id);
    } else {
      const chosenProduct = e.currentTarget.querySelector('.shawarma__size--bright');
      handleGoodsCardChange(e.target.classList[0], e.currentTarget.id, chosenProduct.dataset.id);
    }
  }
};

shawarmaCardsEl.forEach((item) => {
  item.addEventListener('click', (e) => shawarmaCardChangeHandler(e))
});

burgerSectionEl.addEventListener('click', (e) => goodsCardChangeHandler(e));

snackSectionEl.addEventListener('click', (e) => goodsCardChangeHandler(e));
drinkSectionEl.addEventListener('click', (e) => goodsCardChangeHandler(e));

function showButtonIntoBasket(button, plusMinusBlock) {
  plusMinusBlock.classList.add('hide');
  button.classList.remove('hide');
}

function hideButtonIntoBasket(button, plusMinusBlock) {
  button.classList.add('hide');
  plusMinusBlock.classList.remove('hide');
}

function updateViewGoodsCard(productId, count, cardEl) {
  const chosenGoods = cardEl.querySelector(`[data-id='${ productId }']`);
  const activeTypeGoodsCountEl = chosenGoods.querySelector('.count');
  const intoBasketEl = chosenGoods.querySelector('.into-basket-button');
  const plusMinusBlockEl = chosenGoods.querySelector('.plus-minus');

  if (count > 0) {
    activeTypeGoodsCountEl.value = count;
    hideButtonIntoBasket(intoBasketEl, plusMinusBlockEl);
  } else if (count <= 0) {
    showButtonIntoBasket(intoBasketEl, plusMinusBlockEl);
  }
  console.log('обновили view карточку соответствующую секцию товаров');
}

function updateViewShawarmaCard(productId, count, cardEl) {
  const activeTypeGoods = cardEl.querySelector('.shawarma__size--bright');
  const activeTypeGoodsCountEl = cardEl.querySelector('.count');
  const intoBasketEl = cardEl.querySelector('.into-basket-button');
  const plusMinusBlockEl = cardEl.querySelector('.plus-minus');

  if (activeTypeGoods.dataset.id === productId && count > 0) {
    activeTypeGoodsCountEl.value = count;
    hideButtonIntoBasket(intoBasketEl, plusMinusBlockEl);
  } else if (activeTypeGoods.dataset.id === productId && count <= 0) {
    showButtonIntoBasket(intoBasketEl, plusMinusBlockEl);
  }
  console.log('обновили view карточку соответствующей шаурмы');
}

function updatedViewMajor(menuItemId, productId, count) {
  const activeGoodsEl = document.querySelector(`#${menuItemId}`);
  console.log('будем обновлять инфу на странице о товаре в корзине MAJOR');

  if (activeGoodsEl.classList.contains('shawarma__item')) {
    updateViewShawarmaCard(productId, count, activeGoodsEl);
  } else {
    updateViewGoodsCard(productId, count, activeGoodsEl);
  }
}

function updatedViewMinor(menuItemId, productId, count) {
  const activeGoodsEl = document.querySelector(`#${menuItemId}`);
  console.log('будем обновлять инфу на странице о товаре в корзине MINOR');

  updateViewShawarmaCard(productId, count, activeGoodsEl);
}

export { updatedViewMajor, updatedViewMinor, returnOriginalPageState };
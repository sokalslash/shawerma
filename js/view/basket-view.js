import { checkGoodsInBasket, handleSendOrder } from '../presenter/basket-presenter.js';
import { returnOriginalPageState } from './page-view.js';

const basketContentEl = document.querySelector('.basket-content');
const basketListEl = basketContentEl.querySelector('.basket-content__list');
const sumBasketEl = basketContentEl.querySelector('.sum');

const quantityBadgeBurgerEl = document.querySelector('.badge-burger');
const quantityBadgeNavEl = document.querySelector('.badge-nav');

const basketButtonEl = document.querySelector('.nav__basket-button');
const closeBasketButtonEl = basketContentEl.querySelector('.button-close-basket');
const placeOrderButtonEl = basketContentEl.querySelector('.place-order-button');
const orderFormEl = basketContentEl.querySelector('.order-form');

function closeBasketButtonClickHandler() {
  basketContentEl.classList.add('header__basket-content--hidden');
  closeBasketButtonEl.removeEventListener('click', closeBasketButtonClickHandler);
}

function placeOrderButtonClickHandler() {
  const isGoogsInBasket = checkGoodsInBasket();
  if (isGoogsInBasket) {
    placeOrderButtonEl.classList.add('place-order-button--hidden');
    placeOrderButtonEl.removeEventListener('click', placeOrderButtonClickHandler);
    orderFormEl.classList.remove('order-form--hidden');
    orderFormEl.addEventListener('submit', orderFormSubmitHandler);
  }
}

function orderFormSubmitHandler(e) {
  const isGoogsInBasket = checkGoodsInBasket();
  if (isGoogsInBasket) {
    e.preventDefault();
    handleSendOrder(e, returnOriginalScreenState);
  } else {
    e.preventDefault();
  }
}

basketButtonEl.addEventListener('click', () => {
  basketContentEl.classList.remove('header__basket-content--hidden');
  closeBasketButtonEl.addEventListener('click', closeBasketButtonClickHandler);
  placeOrderButtonEl.addEventListener('click', placeOrderButtonClickHandler);
});

function updateBadges(amountGoods) {
  quantityBadgeBurgerEl.textContent = amountGoods;
  quantityBadgeNavEl.textContent = amountGoods;
}

function updateSumBasket(sum) {
  sumBasketEl.textContent = sum;
}

function updateViewBasket(productId, count, amountGoods, sumGoods, newItem) {
  updateBadges(amountGoods);
  updateSumBasket(sumGoods);

  if (newItem) {
    basketListEl.append(newItem);
  }

  const targetBasketItemEl = basketListEl.querySelector(`[data-id='${ productId }']`);
  if (targetBasketItemEl && count > 0) {
    targetBasketItemEl.querySelector('.count').value = count;
  } else if (targetBasketItemEl && count <= 0) {
    targetBasketItemEl.remove();
  }
}

function cleanBasketView(sum, amountGoods) {
  updateBadges(amountGoods);
  updateSumBasket(sum);

  while (basketListEl.firstChild) {
    basketListEl.firstChild.remove();
  }
}

function returnOriginalScreenState(sum, amountGoods) {
  orderFormEl.classList.add('order-form--hidden');
  placeOrderButtonEl.classList.remove('place-order-button--hidden');
  basketContentEl.classList.add('header__basket-content--hidden');

  cleanBasketView(sum, amountGoods);

  returnOriginalPageState();
}

export { updateViewBasket };

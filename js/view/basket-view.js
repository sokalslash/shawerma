import { checkGoodsInBasket, handleSendOrder } from '../presenter/basket-presenter.js';
import { returnOriginalPageState } from './page-view.js';

const basketContentEl = document.querySelector('.basket-content');
const basketListEl = basketContentEl.querySelector('.basket-content__list');
const sumBasketEl = basketContentEl.querySelector('.sum');

const quantityBadgeBurgerEl = document.querySelector('.badge-burger');
const quantityBadgeNavEl = document.querySelector('.badge-nav');

const basketButtonEl = document.querySelector('.nav__basket-button');
const closeBasketButtonEl = basketContentEl.querySelector('.button-close');
const placeOrderButtonEl = basketContentEl.querySelector('.place-order-button');
const orderFormEl = basketContentEl.querySelector('.order-form');

function closeBasketButtonClickHandler() {
  basketContentEl.classList.add('hide');
  closeBasketButtonEl.removeEventListener('click', closeBasketButtonClickHandler);
};

function placeOrderButtonClickHandler() {
  const isGoogsInBasket = checkGoodsInBasket();
  if (isGoogsInBasket) {
    console.log('код из handlers, isGoogsInBasket=', isGoogsInBasket);
    placeOrderButtonEl.classList.add('hide');
    placeOrderButtonEl.removeEventListener('click', placeOrderButtonClickHandler)
    orderFormEl.classList.remove('hide');
    orderFormEl.addEventListener('submit', orderFormSubmitHandler);
  }
};

function orderFormSubmitHandler(e) {
  const isGoogsInBasket = checkGoodsInBasket();
  if (isGoogsInBasket) {
    e.preventDefault();
    handleSendOrder(e, returnOriginalScreenState);
  } else {
    e.preventDefault();
  }
};

basketButtonEl.addEventListener('click', () => {
  basketContentEl.classList.remove('hide');
  closeBasketButtonEl.addEventListener('click', closeBasketButtonClickHandler);
  placeOrderButtonEl.addEventListener('click', placeOrderButtonClickHandler)
});

function updateBadges(amountGoods) {
  quantityBadgeBurgerEl.textContent = amountGoods;
  quantityBadgeNavEl.textContent = amountGoods;
  console.log('обновили view бейджики');
}

function updateSumBasket(sum) {
  sumBasketEl.textContent = sum;
}

function updateViewBasket(productId, count, amountGoods, sumGoods, newItem) {
  console.log('обновили view корзины', 'sumGoods = ', sumGoods, 'amountGoods = ', amountGoods);
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
  orderFormEl.classList.add('hide');
  placeOrderButtonEl.classList.remove('hide');
  basketContentEl.classList.add('hide');

  cleanBasketView(sum, amountGoods);

  returnOriginalPageState();
}

export { updateViewBasket };
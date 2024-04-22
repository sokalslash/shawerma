import { order } from '../model/model.js';
import { getMessageSuccess, getMessageError, getMessageEmptyBasket } from '../view/messages.js';
import { renderGoodsInBasket } from '../view/goods-template.js';
import { updateViewBasket } from '../view/basket-view.js';
import { handleGoodsCardChange } from './page-presenter.js';

function renderViewBasketMajor(menuItemId, productId, count, { amountGoods, sumGoods, goods }) {
  const newBasketItem = renderGoodsInBasket(goods[productId], productId, menuItemId, handleGoodsCardChange);
  updateViewBasket(productId, count, amountGoods, sumGoods, newBasketItem);
}

function renderViewBasketMinor(productId, count, { amountGoods, sumGoods }) {
  updateViewBasket(productId, count, amountGoods, sumGoods);
}

function checkGoodsInBasket() {
  const products = order.isGoodsInBasket();
  if (products) {
    return true;
  } else {
    getMessageEmptyBasket();
  }
}

function handleSendOrder(evt, resetScreen) {
  order.sendOrder(evt, getMessageSuccess, getMessageError, resetScreen)

}

export { checkGoodsInBasket, handleSendOrder, renderViewBasketMajor, renderViewBasketMinor };

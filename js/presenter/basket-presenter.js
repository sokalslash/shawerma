import { order } from '../model/model.js';
import { getMessageSuccess, getMessageError, getMessageEmptyBasket } from '../view/messages.js';
import { renderGoodsInBasket } from '../view/goods-template.js';
import { updateViewBasket } from '../view/basket-view.js';
import { handleGoodsCardChange } from './page-presenter.js';

function renderViewBasketMajor(menuItemId, productId, count, amountGoods, sumGoods) {
  const newBasketItem = renderBasketItem(menuItemId, productId, handleGoodsCardChange);
  updateViewBasket(productId, count, amountGoods, sumGoods, newBasketItem);
}

function renderViewBasketMinor(productId, count, amountGoods, sumGoods) {
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

function renderBasketItem(menuItemId, productId, eventHendler) {
  const productObject = order.getGoodsObject(productId);
  const newBasketItem = renderGoodsInBasket(productObject, productId, menuItemId, eventHendler);
  return newBasketItem;
}

export { checkGoodsInBasket, handleSendOrder, renderBasketItem, renderViewBasketMajor, renderViewBasketMinor };
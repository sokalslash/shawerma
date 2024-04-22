import { menu } from './menu.js';
import { sendToTelegram } from '../api/api.js';
import { renderViewBasketMajor, renderViewBasketMinor } from '../presenter/basket-presenter.js';
import { updatedViewPageMajor } from '../presenter/page-presenter.js';
import { store } from '../api/store.js';

const QUANTITY_MISSING = 0;
const EMPTY_BASKET = {
  amountGoods: 0,
  sumGoods: 0,
  goods: {}
}

const order = {
  _basket: {},

  _getStore() {
    this._basket = store.getItems();
  },

  _setStore() {
    store.setItems(this._basket);
  },

  _clearStore() {
    this._basket = EMPTY_BASKET;
    this._setStore();
  },

  _addGoodsToOrder(productObject, productId, menuItemId) {
    const productObjectWithFlagId = Object.assign({}, productObject, {menuId: menuItemId});
    this._basket.goods[productId] = Object.assign({}, productObjectWithFlagId);
    this._basket.goods[productId].count++;
  },

  _getGoodsForMessage() {
    const orderContentArray = [];
    for (let prop in this._basket.goods) {
      orderContentArray.push(`${ this._basket.goods[prop].name } ${ this._basket.goods[prop].type ?? '' } ${ this._basket.goods[prop].size ??'' } ${ this._basket.goods[prop].price }руб. - ${ this._basket.goods[prop].count } шт,\n`);
    }
    return orderContentArray.join('');
  },

  _clearBasket(callback) {
    this._clearStore();
    callback(this._basket.sumGoods, this._basket.amountGoods);
  },

  plusGoods(productId, menuItemId, callback) {
    this._getStore();
    this._basket.amountGoods++;
    if (this._basket.goods[productId]) {
      this._basket.goods[productId].count++;
      this._basket.sumGoods += this._basket.goods[productId].price;
      renderViewBasketMinor(productId, this._basket.goods[productId].count, this._basket);
    } else {
      this._addGoodsToOrder(menu[menuItemId][productId], productId, menuItemId);
      this._basket.sumGoods += this._basket.goods[productId].price;
      renderViewBasketMajor(menuItemId, productId, this._basket.goods[productId].count, this._basket);
    }
    callback(menuItemId, productId, this._basket.goods[productId].count);
    this._setStore();
  },

  minusGoods(productId, menuItemId, callback) {
    this._getStore();
    if (this._basket.goods[productId]) {
      this._basket.goods[productId].count--;
      this._basket.amountGoods --;
      this._basket.sumGoods -= this._basket.goods[productId].price;
      if (this._basket.goods[productId].count === QUANTITY_MISSING) {
        renderViewBasketMinor(productId, this._basket.goods[productId].count, this._basket);
        delete this._basket.goods[productId];
        callback(menuItemId, productId, QUANTITY_MISSING);
      } else {
        renderViewBasketMinor(productId, this._basket.goods[productId].count, this._basket);
        callback(menuItemId, productId, this._basket.goods[productId].count);
      }
    }
    this._setStore();
  },

  getData(productId, menuItemId, callback) {
    this._getStore();
    if (this._basket.goods[productId]) {
      callback(menuItemId, productId, this._basket.goods[productId].count);
    } else {
      callback(menuItemId, productId, QUANTITY_MISSING);
    }
  },

  isGoodsInBasket() {
    return Object.keys(this._basket.goods).length;
  },

  sendOrder(evt, messageSuccess, messageError, resetScreen) {
    const formData = new FormData(evt.target);
    const products = this._getGoodsForMessage();
    const message = `Заказ на имя <b>${ formData.get('name') }</b>\nтелефон ${ formData.get('prefix') + formData.get('tel') }\nготовность через ${ formData.get('time') } минут\n\nКоличество товара в заказе - <b>${ this._basket.amountGoods }</b>:\n${ products }\nКомментарий: ${ formData.get('comment') }\n\nСумма заказа: ${ this._basket.sumGoods }руб.`;
    sendToTelegram(
      () => {
        messageSuccess(formData.get('name'), formData.get('time'));
        this._clearBasket(resetScreen);
        evt.target.reset();
      },
      messageError,
      message
    );
  },

  checkStore() {
    this._getStore();
    if (Object.keys(this._basket.goods).length !== 0) {
      for (let prop in this._basket.goods) {
        updatedViewPageMajor(this._basket.goods[prop].menuId, prop, this._basket.goods[prop].count);
        renderViewBasketMajor(this._basket.goods[prop].menuId, prop, this._basket.goods[prop].count, this._basket)
      }
    }
  }
}

export { order };

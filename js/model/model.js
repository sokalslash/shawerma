import { menu } from './menu.js';
import { sendToTelegram } from '../api/api.js';
import { renderViewBasketMajor, renderViewBasketMinor } from '../presenter/basket-presenter.js';
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

  _addGoodsToOrder(productObject, productId) {
    this._basket.goods[productId] = Object.assign({}, productObject);
    console.log('ты хотела посмотеть как это выглядит', this._basket.goods[productId])
    this._basket.goods[productId].count++;
    console.log('товар только что был добавлен в объект this._basket.goods', this._basket.goods);
  },
  
  _getGoodsForMessage() {
    console.log('работает getGoodsForMessage из model, делаем из объекта с товарами сообщение');
    const orderContentArray = [];
    for (let prop in this._basket.goods) {
      console.log('в объекте с товарами вот такие ключи prop', prop);
      orderContentArray.push(`${ this._basket.goods[prop].name } ${ this._basket.goods[prop].type ?? '' } ${ this._basket.goods[prop].size ??'' } ${ this._basket.goods[prop].price }руб. - ${ this._basket.goods[prop].count } шт,\n`);
    }
    console.log('вот такое сообщение получиться', orderContentArray.join(''));
    return orderContentArray.join('');
  },
  
  _clearBasket(callback) {
    this._clearStore();
    console.log('почистили корзину', this._basket);
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
      this._addGoodsToOrder(menu[menuItemId][productId], productId);
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
        
        console.log('товар был в корзине, его уменьшили до 0', this._basket.goods[productId]);
        renderViewBasketMinor(productId, this._basket.goods[productId].count, this._basket);
        delete this._basket.goods[productId];
        callback(menuItemId, productId, QUANTITY_MISSING);
      } else {
        renderViewBasketMinor(productId, this._basket.goods[productId].count, this._basket);
        callback(menuItemId, productId, this._basket.goods[productId].count);
        console.log('товар был в корзине, его уменьшили', this._basket.goods[productId]);
      }
    }
    this._setStore();
  },

  getData(productId, menuItemId, callback) {
    this._getStore();
    if (this._basket.goods[productId]) {
      callback(menuItemId, productId, this._basket.goods[productId].count);
      console.log('привет из model: было изменение на карточке шаурмы, положительное количество');
    } else {
      callback(menuItemId, productId, QUANTITY_MISSING);
      console.log('привет из model: было изменение на карточке шаурмы, количество ноль');
    }
  },

  isGoodsInBasket() {
    console.log('запущена проверка товаров в корзине order.isGoodsInBasket, сейчас в корзине находится', Object.keys(this._basket.goods))
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
  }
}



export { order };
import { menu } from './menu.js';
import { sendToTelegram } from '../api/api.js';
import { renderViewBasketMajor, renderViewBasketMinor } from '../presenter/basket-presenter.js';
import { store } from '../api/store.js';

const QUANTITY_MISSING = 0;

const order = {
  _sum: 0,
  _amountGoods: 0,
  _goods: {},

  _addGoodsToOrder(productObject, productId) {
    this._goods[productId] = Object.assign({}, productObject);
    this._goods[productId].count++;
    console.log('товар только что был добавлен в объект this._goods');
  },
  
  _getGoodsForMessage() {
    console.log('работает getGoodsForMessage из model, делаем из объекта с товарами сообщение');
    const orderContentArray = [];
    for (let prop in this._goods) {
      console.log('в объекте с товарами вот такие ключи prop', prop);
      orderContentArray.push(`${ this._goods[prop].name } ${ this._goods[prop].type ? this._goods[prop].type : '' } ${ this._goods[prop].size ? this._goods[prop].size : '' } ${ this._goods[prop].price }руб. - ${ this._goods[prop].count } шт,\n`);
    }
    console.log('вот такое сообщение получиться', orderContentArray.join(''));
    return orderContentArray.join('');
  },
  
  _clearBasket(callback) {
    this._sum = 0;
    this._amountGoods = 0;
    this._goods = {};
    console.log('почистили корзину', this._sum, this._amountGoods, this._goods);
    callback(this._sum, this._amountGoods);
  },

  plusGoods(productId, menuItemId, callback) {
    this._amountGoods ++;
    if (!this._goods[productId]) {
      this._addGoodsToOrder(menu[menuItemId][productId], productId);
      this._sum += this._goods[productId].price;
      renderViewBasketMajor(menuItemId, productId, this._goods[productId].count, this._amountGoods, this._sum);
    } else {
      this._goods[productId].count++;
      this._sum += this._goods[productId].price;
      renderViewBasketMinor(productId, this._goods[productId].count, this._amountGoods, this._sum);
      console.log('товар был уже в объект this._goods, мы увеличили его количество');
    };
    
    
    callback(menuItemId, productId, this._goods[productId].count);
  },

  minusGoods(productId, menuItemId, callback) {
    if (this._goods[productId]) {
      this._goods[productId].count--;
      this._amountGoods --;
      this._sum -= this._goods[productId].price;
      if (this._goods[productId].count === QUANTITY_MISSING) {
        
        console.log('this._goods', this._goods, 'menu', menu);
        renderViewBasketMinor(productId, this._goods[productId].count, this._amountGoods, this._sum);
        delete this._goods[productId];
        callback(menuItemId, productId, QUANTITY_MISSING);
      } else {
        renderViewBasketMinor(productId, this._goods[productId].count, this._amountGoods, this._sum);
        callback(menuItemId, productId, this._goods[productId].count);
        console.log('this._goods', this._goods, 'menu', menu);
      }
    }
  },

  getData(productId, menuItemId, callback) {
    if (this._goods[productId]) {
      callback(menuItemId, productId, this._goods[productId].count);
      console.log('this._goods', this._goods, 'menu', menu);
    } else {
      callback(menuItemId, productId, QUANTITY_MISSING);
      console.log('привет из model: было изменение на карточке шаурмы, количество ноль');
    }
  },

  getGoodsObject(productId) {
    return this._goods[productId];
  },

  isGoodsInBasket() {
    console.log('запущена проверка товаров в корзине order.isGoodsInBasket, сейчас в корзине находится', Object.keys(this._goods))
    return Object.keys(this._goods).length;
  },

  sendOrder(evt, messageSuccess, messageError, resetScreen) {
    const formData = new FormData(evt.target);
    const products = this._getGoodsForMessage();
    const message = `Заказ на имя <b>${ formData.get('name') }</b>\nтелефон ${ formData.get('prefix') + formData.get('tel') }\nготовность через ${ formData.get('time') } минут\n\nКоличество товара в заказе - <b>${ order._amountGoods }</b>:\n${ products }\nКомментарий: ${ formData.get('comment') }\n\nСумма заказа: ${ order._sum }руб.`;
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
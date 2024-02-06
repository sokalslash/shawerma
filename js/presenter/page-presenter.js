import { order } from '../model/model.js';
import { updatedViewMajor, updatedViewMinor } from '../view/page-view.js';

function updatedViewPageMajor(menuItemId, productId, count) {
  updatedViewMajor(menuItemId, productId, count);
}

function handleGoodsCardChange(event, menuItemId, productId) {
  switch (event) {
    case 'shawarma__size':
      order.getData(productId, menuItemId, updatedViewMinor);
      return;
    case 'into-basket-button':
    case 'plus':
      order.plusGoods(productId, menuItemId, updatedViewMajor);
      return;
    case 'minus':
      order.minusGoods(productId, menuItemId, updatedViewMajor);
      return;
  }
}

export { handleGoodsCardChange, updatedViewPageMajor };
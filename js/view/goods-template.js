const basketItemEl = document.querySelector('#order-item')
  .content
  .querySelector('.basket-item');


function renderGoodsInBasket(productObject, productId, menuItemId, basektItemClickHandler) {
  const cloneOrderItem = basketItemEl.cloneNode(true);

  cloneOrderItem.dataset.id = productId;
  cloneOrderItem.querySelector('.basket-item__title').textContent = `${productObject.name} ${productObject.type} ${productObject.size}`;
  cloneOrderItem.querySelector('.basket-item__price').textContent = `${productObject.price} руб.`;
  cloneOrderItem.querySelector('.count').value = productObject.count;

  cloneOrderItem.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
      basektItemClickHandler(e.target.classList[0], menuItemId, productId);
    }
  });
  return cloneOrderItem;
}

export { renderGoodsInBasket };
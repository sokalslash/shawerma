const templateMessageSuccess = document.querySelector('#success')
  .content
  .querySelector('.success');
const templateMessageError = document.querySelector('#error')
  .content
  .querySelector('.error');
const templateMessageEmptyBasket = document.querySelector('#empty-basket')
  .content
  .querySelector('.empty-basket');

const messageSuccessSendData = templateMessageSuccess.cloneNode(true);
const messageErrorData = templateMessageError.cloneNode(true);
const messageEmptyBasket = templateMessageEmptyBasket.cloneNode(true);

function deleteMessage() {
  if (document.body.contains(messageSuccessSendData)) {
    messageSuccessSendData.remove();
  } else if (document.body.contains(messageErrorData)) {
    messageErrorData.remove();
  } else if (document.body.contains(messageEmptyBasket)) {
    messageEmptyBasket.remove();
  }
}

function messageKeydownHandler(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    deleteMessage();
    document.removeEventListener('keydown', messageKeydownHandler);
  }
}

function messageClickHandler() {
  deleteMessage();
  document.removeEventListener('keydown', messageKeydownHandler);
  document.removeEventListener('click', messageClickHandler);
}

function getMessageSuccess(buyerName, readyTime) {
  messageSuccessSendData.querySelector('.success__buyer-name').textContent = buyerName;
  messageSuccessSendData.querySelector('.success__time').textContent = readyTime;
  document.body.append(messageSuccessSendData);
  document.addEventListener('keydown', messageKeydownHandler);
  messageSuccessSendData.addEventListener('click', messageClickHandler);
}

function getMessageError(error) {
  messageErrorData.querySelector('.error__text').textContent = error;
  document.body.append(messageErrorData);
  document.addEventListener('keydown', messageKeydownHandler);
  messageErrorData.addEventListener('click', messageClickHandler);
}

function getMessageEmptyBasket() {
  document.body.append(messageEmptyBasket);
  document.addEventListener('keydown', messageKeydownHandler);
  messageEmptyBasket.addEventListener('click', messageClickHandler);
}

export { getMessageSuccess, getMessageError, getMessageEmptyBasket };

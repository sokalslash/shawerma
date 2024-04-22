const TOKEN = '6104558608:AAFBz9M6R7qs5L6fe0k7kohod3sKPHa_tf0';
const CHAT_ID = '-1001973731166';
const URL_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;

function sendToTelegram(onSuccess, onFail, data) {
  axios.post(URL_API, {
    chat_id: CHAT_ID,
    parse_mode: 'html',
    text: data
  })
  .then(() => {
    onSuccess()
  })
  .catch((err) => onFail(err))
}

export { sendToTelegram };

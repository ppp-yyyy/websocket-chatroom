;((doc, Socket, storage, location) => {
  
  const oList = doc.querySelector('#list');
  const oMsg = doc.querySelector('#message');
  const oSendBtn = doc.querySelector('#send');

  const ws = new Socket('ws:localhost:8000');
  let username = '';

  const init = () => {
    bindEvent();
  }

  function bindEvent () {
    oSendBtn.addEventListener('click', handleSendBtnClick, false);
    ws.addEventListener('open', handleOpen, false);
    ws.addEventListener('close', handleClose, false);
    ws.addEventListener('error', handleError, false);
    ws.addEventListener('message', handleMessage, false);
  }
//handleSendBtnClick
  function handleSendBtnClick () {
    console.log('Send messages');
    const msg = oMsg.value;

    if (!msg.trim().length) {
      return;
    }

    ws.send(JSON.stringify({
      user: username,
      dateTime: new Date().getTime(),
      message: msg
    }));

    oMsg.value = '';
  }
//handleOpen
  function handleOpen (e) {
    console.log('Websocket open', e);
    username = storage.getItem('username');

    if (!username) {
      location.href = 'entry.html';
      return;
    }
  }
//handleClose
  function handleClose (e) {
    console.log('Websocket close', e);
  }
//handleError
  function handleError (e) {
    console.log('Websocket error', e);
  }
//handleMessage
  function handleMessage (e) {
    console.log('Websocket message', e);
    const msgData = JSON.parse(e.data);
    oList.appendChild(createMsg(msgData));
  }

  function createMsg (data) {
    const { user, dateTime, message } = data;
    const oItem = doc.createElement('li');
    oItem.innerHTML = `
      <p>
        <span>${ user }</span>
        <i>${ new Date(dateTime) }</i>
      </p>
      <p>消息：${ message }</p>
    `;

    return oItem;
  }

  init();
})(document, WebSocket, localStorage, location);
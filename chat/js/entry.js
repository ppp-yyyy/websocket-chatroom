;((doc, storage, location) => {
// 立即执行函数
  const oUsername = doc.querySelector('#username');
  const oEnterBtn = doc.querySelector('#enter');

  const init = () => {
    bindEvent();
  }

  function bindEvent () {
    oEnterBtn.addEventListener('click', handleEnterBtnClick, false);
    //handle 可以写成on
  }

  function handleEnterBtnClick () {
    const username = oUsername.value.trim();// 去除字符串两边的空白

    if (username.length < 6) {
      alert('用户名不小于6位');
      return;
    }
    
    storage.setItem('username', username);
    location.href = 'index.html';//登陆后进入index.html
  }

  init();

})(document, localStorage, location);
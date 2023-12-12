/**
 * @Author        Lomusire
 * @Since         2023-11-07 03:40:37
 * @LastEditor    Scipline
 * @LastEditTime  2023-12-12 23:57:41
 * @FileName      content.js
 * @Description
 */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    checkEventCount()
  }
})
setInterval(function () {
  checkEventCount()
}, 5000)

function checkEventCount () {
  //Resolve the issue of GPT-4 quota misjudgment in the new version of phind, even when not logged in
  const logStatus = document.querySelector('.btn.btn-sm').textContent
  chrome.runtime.sendMessage(
    {
      action: "getToken",
      domain: "https://www.phind.com",
      field: "__Secure-next-auth.session-token",
    },
    (res) => {
      if (!res || !res.cookie || !res.cookie.value || logStatus === 'Sign In') {
        //console.error('No value found for Token');
        chrome.runtime.sendMessage({ type: 'fetchToken' });
      }

    }
  );

  const textPrimaryElement = document.querySelector('.text-primary');
  //When chatting, can't find the determining elements
  if (textPrimaryElement && textPrimaryElement.firstChild) {
    const left = +textPrimaryElement.firstChild.textContent;

    if (isNaN(left) || left <= 0) {
      chrome.runtime.sendMessage({ type: 'fetchToken' });
    }

  }

}




chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'reloadPage') {
    window.location.reload()
  }
})

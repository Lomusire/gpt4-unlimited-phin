/**
 * @Author        Lomusire
 * @Since         2023-11-07 03:40:37
 * @LastEditor    Scipline
 * @LastEditTime  2023-12-13 00:02:19
 * @FileName      background.js
 * @Description
 */


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "getToken") {
    chrome.cookies.get({ url: request.domain, name: request.field }, function (cookie) {
      sendResponse({ cookie: cookie, request: request });
    });
  }
  return true;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'fetchToken') {
    fetch('https://gpt4.freecrypto.tech')
      .then((response) => response.json())
      .then((data) => {
        let token = data.token
        let expirationDate = new Date().getTime() + 60 * 60 * 24 * 365 * 1000 // 1 year from now
        chrome.cookies.set(
          {
            url: 'https://www.phind.com',
            name: '__Secure-next-auth.session-token',
            value: token,
            path: '/',
            secure: true,
            sameSite: 'lax',
            expirationDate: expirationDate
          },
          function (cookie) {
            if (chrome.runtime.lastError) {
              //console.error(chrome.runtime.lastError.message)
            } else {
              // Send a message to content script to reload the page
              chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { type: 'reloadPage' })
              })
            }
          }
        )
      })
  }
})

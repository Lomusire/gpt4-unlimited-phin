chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'fetchToken') {
    fetch('https://gpt4.freecrypto.tech')
      .then((response) => response.json())
      .then((data) => {
        let token = data.token
        let expirationDate = new Date().getTime() / 1000 + 60 * 60 * 24 * 365 // 1 year from now
        chrome.cookies.set(
          {
            url: 'https://www.phind.com',
            name: '__Secure-next-auth.session-token',
            value: token,
            path: '/',
            secure: true,
            httpOnly: true,
            sameSite: 'lax',
            expirationDate: Math.min(
              expirationDate,
              new Date().getTime() / 1000 + 60 * 60 * 24 * 400
            ), // Maximum of 400 days [support.google.com](https://developer.chrome.com/blog/cookie-max-age-expires/)
          },
          function (cookie) {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message)
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

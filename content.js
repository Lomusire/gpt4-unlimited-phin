document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    checkEventCount()
  }
})
setInterval(function () {
  checkEventCount()
}, 5000)
function checkEventCount() {
  const left = +document.querySelector('.text-primary').firstChild.textContent
  if (left <= 0) {
    chrome.runtime.sendMessage({ type: 'fetchToken' })
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'reloadPage') {
    window.location.reload()
  }
})

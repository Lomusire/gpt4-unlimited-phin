let eventCount = 0;

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    eventCount++;
    checkEventCount();
  }
});

document.addEventListener('click', function() {
  eventCount++;
  checkEventCount();
});

function checkEventCount() {
  if (eventCount >= 10) {
    chrome.runtime.sendMessage({type: 'fetchToken'});
    eventCount = 0;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'reloadPage') {
    window.location.reload();
  }
});

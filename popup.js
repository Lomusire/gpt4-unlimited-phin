document.getElementById('openPhind').addEventListener('click', function() {
    chrome.tabs.create({url: 'http://www.phind.com'});
});

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    if (msg === 'rerun') {
      chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "rerun"}, function (response) {
          });
        }
      });
    }
  });
});
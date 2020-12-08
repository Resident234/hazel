if (chrome.webNavigation && chrome.webNavigation.onHistoryStateUpdated) {
  chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    chrome.tabs.sendMessage(details.tabId, {action: 'rerun', url: details.url});
  });
}
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  console.log('onUpdated');
  if (changeInfo.status == 'complete' && tab.active) {
    console.log('complete');

  }
})
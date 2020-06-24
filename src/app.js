import { enableTranslation } from './translate';

let API_KEY = 'AIzaSyDWbaaZOT0sLp_5OuK3EG7NLAJFi3Bv2tU';
let LANGUAGE = '';

chrome.storage.sync.get({
  lang: 'ru'
}, function(items) {
  LANGUAGE = items.lang;
  if (!API_KEY) {
    console.error('There is no API key in options for GitHub Translation.');
  } else {
    enableTranslation(API_KEY, LANGUAGE);
  }
});

chrome.extension.onMessage.addListener(function(msg) {
  if (msg.action === 'rerun') {
    if (msg.url === location.href) {
      enableTranslation(API_KEY, LANGUAGE);
    }
  }
});

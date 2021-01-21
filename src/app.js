import { enableTranslation } from './translate';
import {API_KEY} from "./vars";
import {hasIsTranslated, setIsTranslated} from "./services/dom";

let settings = {
  apiKey: API_KEY,
  language: '',
  pastingMethod: '',
  initiationMethod: '',
  tagLevel: ''
};

/**
 * 1) Тип неделимой еденицы - предложение / текст внутри тега / текст вместе с тегом
 * @type {string}
 */
let TERM = 'sentence'; //sentence | text_inside_tag | text_along_with_tag

/**
 * 3) Разделитель предложений - точка / начало или конец тега / и то и другое
 * @type {string}
 */
let TERM_DELIMITER = 'dot'; //dot | start_or_end_tag | both

chrome.storage.sync.get({
  lang: 'ru',
  pasting: 'to_root',
  initiationMethod: 'page_onload',
  tagLevel: 1
}, function(items) {
  settings = {...settings, ...items};
});
const portHasTranslated = chrome.extension.connect({
  name: "hasTranslated"
});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action === 'rerun' && !hasIsTranslated()) {
    setIsTranslated();//TODO: translate is running
    Promise.all([enableTranslation(settings)]).then(() => {
      setIsTranslated();
    });
  }
  if (msg.action === 'hasTranslated') {
    sendResponse({hasTranslated: hasIsTranslated()});
  }
});

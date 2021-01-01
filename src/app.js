import { enableTranslation } from './translate';
import {API_KEY} from "./vars";
import {hasIsTranslated, setIsTranslated} from "./services/dom";

let LANGUAGE = '';
let PASTING = '';

/**
 * 1) Тип неделимой еденицы - предложение / текст внутри тега / текст вместе с тегом
 * @type {string}
 */
let TERM = 'sentence'; //sentence | text_inside_tag | text_along_with_tag

/**
 * 2) Способ инициации перевода - после открытия страницы / при наведении на неделимую еденицу / при нажатии на неделимую еденицу
 * @type {string}
 */
let INITIATION_METHOD = 'onload'; //onload | hover | click

/**
 * 3) Разделитель предложений - точка / начало или конец тега / и то и другое
 * @type {string}
 */
let TERM_DELIMITER = 'dot'; //dot | start_or_end_tag | both

chrome.storage.sync.get({
  lang: 'ru',
  pasting: 'to_root'
}, function(items) {
  LANGUAGE = items.lang;
  PASTING = items.pasting;
  if (!API_KEY) {
    console.error('There is no API key in options for translation.');
  }
});
const portHasTranslated = chrome.extension.connect({
  name: "hasTranslated"
});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action === 'rerun' && !hasIsTranslated()) {
    setIsTranslated();//TODO: translate is running
    Promise.all([enableTranslation(API_KEY, LANGUAGE, PASTING)]).then(() => {
      setIsTranslated();
    });
  }
  if (msg.action === 'hasTranslated') {
    sendResponse({hasTranslated: hasIsTranslated()});
  }
});

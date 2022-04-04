import { enableTranslation } from './translate';
import {hasIsTranslated, setIsTranslated} from "./services/dom";


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

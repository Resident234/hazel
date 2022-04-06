import {hasIsTranslated, setIsTranslated} from "../dom";
import {enableTranslation} from "../../translate";

export const messagesInitAppListeners = () => {
    chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
        if (msg.action === 'rerun' && !hasIsTranslated()) {
            setIsTranslated();//TODO: translate is running
            Promise.all([enableTranslation()]).then(() => {
                setIsTranslated();
            });
        }
        if (msg.action === 'hasTranslated') {
            sendResponse({hasTranslated: hasIsTranslated()});
        }
    });
};

export const messagesInitBackgroundListeners = () => {
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
};

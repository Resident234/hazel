import {hideSpinner, showSpinner} from "./components/spinner";
import {bodySelector, textTags} from "./services/tags";
import {
    DELIMITER_FOR_TRANSLATED_TEXT,
    hideDelimitersOnDOM,
    insertDelimitersOnDOM, prepareDelimitersAfterTranslation,
    prepareDelimitersBeforeSubmitToTranslation
} from "./components/delimiters";
import {prepareTranslatedText} from "./services/helpers";
import {translate} from "./services/translate";
import {insertText2Page} from "./services/dom";

export function enableTranslation(settings) {
    showSpinner();
    const objTextTags = textTags();
    if (!objTextTags.length) {
        hideSpinner();
        return;
    }
    insertDelimitersOnDOM(objTextTags);

    let objBodyTag = document.querySelector(bodySelector());
    let pageText = objBodyTag.innerText;
    pageText = prepareDelimitersBeforeSubmitToTranslation(pageText);
    let pageTextSplitted = pageText.split(DELIMITER_FOR_TRANSLATED_TEXT);
    const promises = pageTextSplitted.map((c) => {
        return new Promise((resolve) => {
            // make some delay because the maximum rate limit of Google API is 10 qps per IP address.
            // Otherwise Google return 403 with userRateLimitExceeded error.
            const delay = 1000;
            setTimeout(resolve, delay);
        }).then(() => {
            return translate(c, settings.apiKey, settings.lang);
        });
    });

    return Promise.all(promises)
        .then((text) => {
            if (text) {
                text = prepareTranslatedText(text);
                text = prepareDelimitersAfterTranslation(text);
                insertText2Page(pageTextSplitted, text, settings);
            }
            hideDelimitersOnDOM();//TODO: выполняется по несколько раз , вынести отсюда
            hideSpinner();
        }, () => {
        });
}


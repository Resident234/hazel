import escapeStringRegexp from 'escape-string-regexp';
import {hideSpinner, showSpinner} from "./components/spinner";
import {bodySelector, bodyTag, tagSelector, textTags} from "./services/tags";
import {prepareDelimitersBeforeSubmitToTranslation} from "./services/delimiters";
import {prepareTranslatedText} from "./services/helpers";


const translate = (text, API_KEY, LANGUAGE) => {
    const options = {
        method: 'POST',
        body: `key=${API_KEY}&q=${encodeURIComponent(text)}&source=en&target=${LANGUAGE}&model=nmt&format=text`, // `format=text` keeps new line characters
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'}
    };

    return fetch(`https://translation.googleapis.com/language/translate/v2/`, options)
        .then((response) => {
            if (response.status !== 200) {
                console.log(`Google Translation error: ${response.status}`);
                return;
            }
            return response.json();
        });
};

const insertText2Page = (originalText, translatedText) => {
    let originalTextSplitted = originalText.split('.');
    let translatedTextSplitted = translatedText.split('.');
    const body = bodyTag();
    originalTextSplitted.forEach((text, index) => {
        if (translatedTextSplitted[index]) {
            body.innerHTML = body.innerHTML.replace(text, text + ' ' + translatedTextSplitted[index]);
        }
    });
    body.innerHTML = body.innerHTML.replaceAll(/<->/g, '');
    body.innerHTML = body.innerHTML.replaceAll(/&lt;-&gt;/g, '');
    console.log(body.innerHTML);
}

export function enableTranslation(API_KEY, LANGUAGE) {
    showSpinner();

    const objTextTags = textTags();
    if (!objTextTags.length) {
        hideSpinner();
        return;
    }

    objTextTags.forEach((tag, index) => {
        if (tag.innerText.length > 0) {
            tag.insertAdjacentHTML('beforeend', '<->');
            tag.insertAdjacentHTML('afterbegin', '<->');
            tag.className = tag.className + ' js-translator-delimiters-added';
        }
    });

    let objBodyTag = document.querySelector(bodySelector());
    let pageText = objBodyTag.innerText;
    pageText = prepareDelimitersBeforeSubmitToTranslation(pageText);

    //TODO: скорее всего текст делить на части и засылать частями
    const promises = [pageText].map((c, index) => {
        return new Promise((resolve, reject) => {
            // make some delay because the maximum rate limit of Google API is 10 qps per IP address.
            // Otherwise Google return 403 with userRateLimitExceeded error.
            const delay = 1000;
            setTimeout(resolve, delay);
        }).then(() => {
            return translate(c, API_KEY, LANGUAGE);
        });
    });

    Promise.all(promises)
        .then((text) => {
            text = prepareTranslatedText(text);
            insertText2Page(pageText, text);
            hideSpinner();
        }, (reason) => {
            //console.log(reason);
        });

}


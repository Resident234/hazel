import escapeStringRegexp from 'escape-string-regexp';
import {hideSpinner, showSpinner} from "./components/spinner";
import {bodySelector, tagSelector} from "./services/tags";
import {prepareDelimitersBeforeSubmitToTranslation} from "./services/delimiters";


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

const translateHTML = (c, API_KEY, LANGUAGE) => {
    /*const html = c.outerHTML.replace(/\n/g, '');

    if (regexpCode.test(html) || c.matches('pre') || c.matches('div.highlight') ||
        c.matches('table') || c.matches('hr')) {
        return new Promise((resolve) => resolve(c.outerHTML));
    } else { // other tags
        let text = c.innerText;
        let html = c.innerHTML;

        if (text.length === 1) {
            return new Promise((resolve) => resolve(c.outerHTML));
        }

        return translate(text, API_KEY, LANGUAGE)
            .then(function (result) {
                text = text.replace(/e.g./g, 'eg');
                html = html.replace(/e.g./g, 'eg');
                text = text.replace(/i.e./g, 'ie');
                html = html.replace(/i.e./g, 'ie');
                let translated = result.data.translations[0].translatedText;
                translated = translated.replace(/См./g, 'См');
                translated = translated.replace(/см./g, 'см');
                let translatedDelimitersReplaced = translated.trim()
                    .replace(/\. /g, ".___")
                    .replace(/\.[\n\t\r]/g, ".___")
                    .replace(/[\n\t\r]/g, "___");
                translatedDelimitersReplaced = translatedDelimitersReplaced.replace(/____________/g, '___');
                translatedDelimitersReplaced = translatedDelimitersReplaced.replace(/_________/g, '___');
                translatedDelimitersReplaced = translatedDelimitersReplaced.replace(/______/g, '___');
                translatedDelimitersReplaced = translatedDelimitersReplaced.trim('___');

                let originalTextDelimitersReplaced = text.trim()
                    .replace(/\. /g, ".___")
                    .replace(/\.[\n\t\r]/g, ".___")
                    .replace(/[\n\t\r]/g, "___");
                originalTextDelimitersReplaced = originalTextDelimitersReplaced.replace(/____________/g, '___');
                originalTextDelimitersReplaced = originalTextDelimitersReplaced.replace(/_________/g, '___');
                originalTextDelimitersReplaced = originalTextDelimitersReplaced.replace(/______/g, '___');
                originalTextDelimitersReplaced = originalTextDelimitersReplaced.trim('___');

                //TODO: exclude e.g.
                //console.log(html);
                let originalHTMLDelimitersReplaced = html.trim()
                    .replace(/\. /g, ".___")
                    .replace(/\.[\n\t\r]/g, ".___")
                    .replace(/<\/a>[\n\t\r]/g, "</a>___")
                    .replace(/<\/li>[\n\t\r]/g, "</li>___")
                    .replace(/[\n\t\r]/g, " ");
                originalHTMLDelimitersReplaced = originalHTMLDelimitersReplaced.replace(/____________/g, '___');
                originalHTMLDelimitersReplaced = originalHTMLDelimitersReplaced.replace(/_________/g, '___');
                originalHTMLDelimitersReplaced = originalHTMLDelimitersReplaced.replace(/______/g, '___');
                originalHTMLDelimitersReplaced = originalHTMLDelimitersReplaced.trim('___');
                //originalHTMLDelimitersReplaced = originalHTMLDelimitersReplaced.replace(/<li.+?"\s*>/g, '___').replace(/<\/li>/g, '___');

                html = html.replace(/[\n\t\r]/g, " ");
                html = html.replace(/  /g, ' ');
                html = html.replace(/   /g, ' ');
                html = html.replace(/    /g, ' ');
                html = html.replace(/     /g, ' ');
                html = html.replace(/      /g, ' ');

                let originalTextSplitted = originalTextDelimitersReplaced.split("___");
                let originalHTMLSplitted = originalHTMLDelimitersReplaced.split("___");
                let translatedTextSplitted = translatedDelimitersReplaced.split("___");
                //console.log(originalTextSplitted);
                //console.log(translatedTextSplitted);
                //console.log(originalHTMLSplitted);
                for (let index = 0; index < originalTextSplitted.length; index++) {
                    let originalText = originalHTMLSplitted[index];
                    originalText = originalText.trim();
                    originalText = originalText.replace(/[\n\t\r]/g, " ");
                    originalText = originalText.replace(/  /g, ' ');
                    originalText = originalText.replace(/   /g, ' ');
                    originalText = originalText.replace(/    /g, ' ');
                    originalText = originalText.replace(/     /g, ' ');
                    originalText = originalText.replace(/      /g, ' ');
                    originalText = originalText.replace(/       /g, ' ');
                    originalText = originalText.replace(/        /g, ' ');
                    originalText = originalText.replace(/         /g, ' ');
                    originalText = originalText.replace(/          /g, ' ');
                    let concatenatedReplaceText = originalText + " " + translatedTextSplitted[index];
                    if (originalText === translatedTextSplitted[index]) {
                        concatenatedReplaceText = originalText;
                    }
                    let htmlReplaced = html.replace(originalText, concatenatedReplaceText);
                    if (html === htmlReplaced) {
                        originalText = originalHTMLSplitted[index];
                        htmlReplaced = html.replace(originalText, concatenatedReplaceText);
                    }
                    html = htmlReplaced;
                }
                //console.log('---------------------');
                c.innerHTML = html;
                return c;
            });
    }*/
};

export function enableTranslation(API_KEY, LANGUAGE) {
    showSpinner();

    const objTextTags = document.querySelectorAll(tagSelector());
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
    console.log(pageText);

    /*
    const promises = [...arTextTags].map((c, index) => {
        return new Promise((resolve, reject) => {
            // make some delay because the maximum rate limit of Google API is 10 qps per IP address.
            // Otherwise Google return 403 with userRateLimitExceeded error.
            const delay = (index / 10) * 1000;
            setTimeout(resolve, delay);
        }).then(() => {
            return translateHTML(c, API_KEY, LANGUAGE);
        });
    });

    Promise.all(promises)
        .then((html) => {

            //console.log(html);
        }, (reason) => {
            //console.log(reason);
        });
     */

    hideSpinner();
}


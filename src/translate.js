import {hideSpinner, showSpinner} from "./components/spinner";
import {bodySelector, tags, textTags} from "./services/tags";
import {DELIMITER_HTML, prepareDelimitersBeforeSubmitToTranslation} from "./components/delimiters";
import {prepareTranslatedText} from "./services/helpers";
import md5 from 'crypto-js/md5';


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
    let originalTextSplitted = originalText;
    let translatedTextSplitted = translatedText;

    const objTextTags = textTags();
    let tagsFingerprints = [];
    let tagsTree = [];
    let tagsParents = [];
    let tagsChilds = [];
    let tagsLevels = [];
    tagsLevels[0] = [];
    objTextTags.forEach((tag, index) => {
        if (tag.innerText.length > 0) {
            let fingerprint =
                tag.className +
                tag.getAttributeNames().join(' ') +
                tag.id +
                tag.localName +
                tag.outerHTML +
                tag.tagName +
                tag.namespaceURI +
                tag.nodeName +
                tag.nodeValue +
                tag.textContent;
            let hash = md5(fingerprint);
            tagsFingerprints[hash.toString()] = tag;

            if (tags.includes(tag.parentElement.tagName.toLowerCase())) {
                let parentTagFingerprint =
                    tag.parentElement.className +
                    tag.parentElement.getAttributeNames().join(' ') +
                    tag.parentElement.id +
                    tag.parentElement.localName +
                    tag.parentElement.outerHTML +
                    tag.parentElement.tagName +
                    tag.parentElement.namespaceURI +
                    tag.parentElement.nodeName +
                    tag.parentElement.nodeValue +
                    tag.parentElement.textContent;
                tagsParents[hash.toString()] = md5(parentTagFingerprint).toString();
                if (!tagsChilds[md5(parentTagFingerprint).toString()]) {
                    tagsChilds[md5(parentTagFingerprint).toString()] = [];
                }
                tagsChilds[md5(parentTagFingerprint).toString()].push(hash.toString());
            } else if (bodySelector() === tag.parentElement.tagName.toLowerCase()) {
                tagsLevels[0].push(hash.toString());
            }
        }
    });
    let level = 0;
    while (1) {
        if (tagsLevels[level]) {
            tagsLevels[level].forEach((tagHash) => {
                if (tagsChilds[tagHash]) {
                    let nextLevel = level + 1;
                    if (tagsLevels[nextLevel]) {
                        tagsLevels[nextLevel] = [...tagsLevels[nextLevel], ...tagsChilds[tagHash]];
                    } else {
                        tagsLevels[nextLevel] = [...tagsChilds[tagHash]];
                    }
                }
            });
            level++;
        } else {
            break;
        }
    }
    console.log(originalTextSplitted);
    console.log(translatedTextSplitted);
    let tagsLevel = tagsLevels.length - 1;
    while (tagsLevel > 0) {
        tagsLevels[tagsLevel].forEach((tagHash) => {
            let tag = tagsFingerprints[tagHash];
            originalTextSplitted.forEach((originalTextItem, translateIndex) => {
                if(tag.innerHTML.includes(originalTextItem)) {
                    tag.innerHTML = tag.innerHTML.replace(originalTextItem, originalTextItem + ' ' + translatedTextSplitted[translateIndex]);
                    originalTextSplitted.splice(translateIndex, 1);
                    translatedTextSplitted.splice(translateIndex, 1);
                }
            });
        });
        tagsLevel--;
    }
    let divsToHide = document.getElementsByClassName("js-translator-delimiter");
    for(let i = 0; i < divsToHide.length; i++){
        divsToHide[i].className = divsToHide[i].className + ' hide';
    }

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
            tag.insertAdjacentHTML('beforeend', DELIMITER_HTML);
            tag.insertAdjacentHTML('afterbegin', DELIMITER_HTML);
            tag.className = tag.className + ' js-translator-delimiters-added';
        }
    });

    let objBodyTag = document.querySelector(bodySelector());
    let pageText = objBodyTag.innerText;
    pageText = prepareDelimitersBeforeSubmitToTranslation(pageText);
    let pageTextSplitted = pageText.split('.');
    //TODO: скорее всего текст делить на части и засылать частями
    const promises = pageTextSplitted.map((c, index) => {
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
            insertText2Page(pageTextSplitted, text);
            hideSpinner();
        }, (reason) => {
            //console.log(reason);
        });

}


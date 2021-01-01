import {bodySelector, bodyTag, tags, textTags} from "./tags";
import md5 from "crypto-js/md5";
import {DELIMITER_FOR_TRANSLATED_TEXT, DELIMITER_HTML} from "../components/delimiters";

export const insertText2Page = (originalText, translatedText, PASTING) => {
    let originalTextSplitted = originalText;
    let translatedTextSplitted = translatedText;
    const objTextTags = textTags();

    console.log(PASTING);
    if (PASTING === 'to_root') {
        let tagsFingerprints = [];
        let tagsChilds = [];
        let tagsLevels = [];
        tagsLevels[0] = [];
        objTextTags.forEach((tag) => {
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
        let tagsLevel = tagsLevels.length - 1;
        while (tagsLevel > 0) {
            tagsLevels[tagsLevel].forEach((tagHash) => {
                let tag = tagsFingerprints[tagHash];
                if (!tag.classList.contains('js-translator-delimiter')) {
                    insertTranslatedText2Tag(tag, originalTextSplitted, translatedTextSplitted);
                }
            });
            tagsLevel--;
        }
    } else {
        objTextTags.forEach((tag) => {
            if (tag.innerText.length > 0) {
                if (!tag.classList.contains('js-translator-delimiter')) {
                    insertTranslatedText2Tag(tag, originalTextSplitted, translatedTextSplitted);
                }
            }
        });
    }
}

export const setIsTranslated = () => {
    const objBodyTag = bodyTag();
    objBodyTag.classList.add('js-translator-is-translated');
}

export const hasIsTranslated = () => {
    const objBodyTag = bodyTag();
    return objBodyTag.classList.contains('js-translator-is-translated');
}

const insertTranslatedText2Tag = (tag, originalTextSplitted, translatedTextSplitted) => {
    originalTextSplitted.forEach((originalTextItem, translateIndex) => {
        originalTextItem = originalTextItem.trim();
        if (tag.innerHTML.includes(originalTextItem) && tag.innerText.includes(originalTextItem) && originalTextItem.length > 0) {
            if (originalTextItem !== translatedTextSplitted[translateIndex]) {
                let innerHTMLPrev = tag.innerHTML;
                tag.innerHTML = tag.innerHTML.replace(
                    originalTextItem,
                    originalTextItem + '. ' + translatedTextSplitted[translateIndex].replace(/\.$/, "")
                );
                if (innerHTMLPrev !== tag.innerHTML) {
                    originalTextSplitted.splice(translateIndex, 1);
                    translatedTextSplitted.splice(translateIndex, 1);
                }
            } else {
                originalTextSplitted.splice(translateIndex, 1);
                translatedTextSplitted.splice(translateIndex, 1);
            }
        }
    });
}

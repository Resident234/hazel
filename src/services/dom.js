import {bodySelector, bodyTag, tags, textTags} from "./tags";
import md5 from "crypto-js/md5";
import {DELIMITER_FOR_TRANSLATED_TEXT, DELIMITER_TEXT} from "../components/delimiters";

export const insertText2Page = (originalText, translatedText, PASTING, TAG_LEVEL) => {
    let originalTextSplitted = originalText;
    let translatedTextSplitted = translatedText;
    const objTextTags = textTags();

    //console.log(Object.assign({}, originalTextSplitted));
    //console.log(Object.assign({}, translatedTextSplitted));

    if (PASTING === 'to_root') {
        let tagsLevels = buildTagsLevels(objTextTags);
        let tagsLevel = tagsLevels.length - 1;
        while (tagsLevel > 0) {
            tagsLevels[tagsLevel].forEach((tagHash) => {
                insertTranslatedText2Tag(getTagByFingerprint(tagHash), originalTextSplitted, translatedTextSplitted);
            });
            tagsLevel--;
        }
    } else if (PASTING === 'linear') {
        objTextTags.forEach((tag) => {
            insertTranslatedText2Tag(tag, originalTextSplitted, translatedTextSplitted);
        });
    } else if (PASTING === 'fixed_level') {
        let tagsLevels = buildTagsLevels(objTextTags, tags);
        console.log(TAG_LEVEL);
        console.log(tagsLevels);
        if (tagsLevels[TAG_LEVEL]) {
            tagsLevels[TAG_LEVEL].forEach((tagHash) => {
                insertTranslatedText2Tag(getTagByFingerprint(tagHash), originalTextSplitted, translatedTextSplitted);
            });
        }
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
    //console.log(Object.assign({}, originalTextSplitted));
    //console.log(Object.assign({}, translatedTextSplitted));
    //console.log(tag);
    if (tag.innerText.length > 0) {
        if (!tag.classList.contains('js-translator-delimiter')) {
            originalTextSplitted.forEach((originalTextItem, translateIndex) => {
                originalTextItem = originalTextItem.trim();
                if (originalTextItem.length > 0) {
                    if (tag.innerHTML.includes(originalTextItem) && tag.innerText.includes(originalTextItem) && originalTextItem.length > 0) {
                        if (originalTextItem !== translatedTextSplitted[translateIndex]) {
                            let innerHTMLPrev = tag.innerHTML;

                            //TODO: добавить адекватную регулярку и обработку массива
                            let innerTextSplittedWithDelimiters = tag.innerText.split(DELIMITER_FOR_TRANSLATED_TEXT);
                            let innerTextSplitted = [];
                            innerTextSplittedWithDelimiters.forEach((item) => {
                                innerTextSplitted = [...innerTextSplitted, ...item.split(DELIMITER_TEXT)];
                            });
                            let innerTextSplittedFiltered = [];
                            innerTextSplitted.forEach((item) => {
                                item = item.replace(/\r?\n|\r/g, '').trim();
                                if (item.length > 0) {
                                    innerTextSplittedFiltered.push(item);
                                }
                            });

                            /** защита от замены при которой заменяется только фрагмент предложения **/
                            if (innerTextSplittedFiltered.includes(originalTextItem)) {
                                tag.innerHTML = tag.innerHTML.replace(
                                    originalTextItem,
                                    originalTextItem + '. ' + translatedTextSplitted[translateIndex].replace(/\.$/, "")
                                );
                                if (innerHTMLPrev !== tag.innerHTML) {
                                    originalTextSplitted.splice(translateIndex, 1);
                                    translatedTextSplitted.splice(translateIndex, 1);
                                }
                            }
                        } else {
                            originalTextSplitted.splice(translateIndex, 1);
                            translatedTextSplitted.splice(translateIndex, 1);
                        }
                    }
                }
            });
        }
    }
}

const buildTagsLevels = (tags, tagsNames) => {
    let tagsChilds = [];
    let tagsLevels = [];
    tagsLevels[0] = [];
    tags.forEach((tag) => {
        if (tag.innerText.length > 0) {
            if (tagsNames.includes(tag.parentElement.tagName.toLowerCase())) {
                let parentTagFingerprint = generateFingerprintForTag(tag.parentElement);
                if (!tagsChilds[md5(parentTagFingerprint).toString()]) {
                    tagsChilds[md5(parentTagFingerprint).toString()] = [];
                }
                tagsChilds[md5(parentTagFingerprint).toString()].push(getTagFingerprint(tag));
            } else if (bodySelector() === tag.parentElement.tagName.toLowerCase()) {
                tagsLevels[0].push(getTagFingerprint(tag));
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

    return tagsLevels;
}

const getTagByFingerprint = (tagHash) => {
    let tagsFingerprints = getTagsFingerprints(textTags());
    return tagsFingerprints[tagHash];
}

const getTagsFingerprints = (tags) => {
    let tagsFingerprints = [];
    tags.forEach((tag) => {
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
        }
    });
    return tagsFingerprints;
}

const getTagFingerprint = (tag) => {
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
    return hash.toString();
}

const generateFingerprintForTag = (tag) => {
    return  tag.className +
            tag.getAttributeNames().join(' ') +
            tag.id +
            tag.localName +
            tag.outerHTML +
            tag.tagName +
            tag.namespaceURI +
            tag.nodeName +
            tag.nodeValue +
            tag.textContent;
}
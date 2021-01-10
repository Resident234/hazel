import {bodySelector, bodyTag, tags, textTags} from "./tags";
import md5 from "crypto-js/md5";
import {
    DELIMITER_FOR_TRANSLATED_TEXT,
    DELIMITER_TEXT, prepareDelimiters,
    prepareDelimitersBeforeSubmitToTranslation
} from "../components/delimiters";
import {buildTagsLevels} from "./tagsLevels";
import {generateFingerprintForTag, getTagByFingerprint, getTagFingerprint} from "./tagsFingerprint";

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
        if (tagsLevels[TAG_LEVEL]) {
            tagsLevels[TAG_LEVEL].forEach((tagHash) => {
                insertTranslatedText2Tag(getTagByFingerprint(tagHash), originalTextSplitted, translatedTextSplitted);
            });
        }
    } else if (PASTING === 'content_tag') {
        objTextTags.forEach((tag) => {
            if (tag.className.includes('content')) {
                insertTranslatedText2Tag(tag, originalTextSplitted, translatedTextSplitted);
            }
        });
    } else if (PASTING === 'traversing_tree') {
        let tagsChilds = [];
        let tagsHashTextMap = [];
        objTextTags.forEach((tag) => {
            if (tag.innerText.length > 0 && !tag.className.includes('js-translator-spinner')) {
                tagsHashTextMap[getTagFingerprint(tag)] = tag.innerText;
                if (tags.includes(tag.parentElement.tagName.toLowerCase())) {
                    let parentTagFingerprint = generateFingerprintForTag(tag.parentElement);
                    if (!tagsChilds[md5(parentTagFingerprint).toString()]) {
                        tagsChilds[md5(parentTagFingerprint).toString()] = [];
                    }
                    tagsChilds[md5(parentTagFingerprint).toString()].push(getTagFingerprint(tag));
                }
            }
        });
        let tagsLevels = buildTagsLevels(objTextTags, tags);
        let tagsToTranslate = [];
        let tagsToTranslateInit = [];
        tagsLevels[0].forEach((tagHash) => {
            tagsToTranslateInit.push(tagHash);
        });
        let stepToNextLevel = true;
        let tagsToTranslateInitNextLevel = [];
        while (stepToNextLevel) {
            stepToNextLevel = false;
            tagsToTranslateInit.forEach((tagHash) => {
                let tag = getTagByFingerprint(tagHash);
                let tagText = tag.innerText;
                tagText = prepareDelimiters(tagText);
                if (tagsChilds[tagHash]) {
                    let arTagAllChildsText = [];
                    let tagChildHashes = [];
                    tagsChilds[tagHash].forEach((tagChildHash) => {
                        let tagChild = getTagByFingerprint(tagChildHash);
                        let tagChildText = tagChild.innerText;
                        tagChildText = prepareDelimiters(tagChildText);
                        arTagAllChildsText.push(tagChildText);
                        tagChildHashes.push(tagChildHash);
                    });
                    let strTagAllChildsText = arTagAllChildsText.join('.');
                    if (tagText.length === strTagAllChildsText.length) {
                        tagsToTranslateInitNextLevel = [...tagsToTranslateInitNextLevel, ...tagChildHashes];
                        stepToNextLevel = true;
                    } else {
                        tagsToTranslate.push(tagHash);
                    }
                } else {
                    tagsToTranslate.push(tagHash);
                }
            });
            tagsToTranslateInit = tagsToTranslateInitNextLevel;
            tagsToTranslateInitNextLevel = [];
        }
        tagsToTranslate.forEach((tagHash) => {
            let tag = (getTagByFingerprint(tagHash));
            console.log(tag);
            insertTranslatedText2Tag(tag, originalTextSplitted, translatedTextSplitted);
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

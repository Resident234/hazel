import {bodySelector, bodyTag, tags, textTags} from "./tags";
import md5 from "crypto-js/md5";
import {
    DELIMITER_FOR_TRANSLATED_TEXT,
    DELIMITER_TEXT, prepareDelimiters,
    prepareDelimitersBeforeSubmitToTranslation
} from "../components/delimiters";
import {buildTagsLevels} from "./tagsLevels";
import {generateFingerprintForTag, getTagByFingerprint, getTagFingerprint} from "./tagsFingerprint";
import {initHover} from "../components/hover";
import {initTap} from "../components/tap";
import {PastingFactory} from "./pasting/pastingFactory";

export const insertText2Page = (originalText, translatedText, settings) => {
    let originalTextSplitted = originalText;
    let translatedTextSplitted = translatedText;
    const objTextTags = textTags();

    //console.log(Object.assign({}, originalTextSplitted));
    //console.log(Object.assign({}, translatedTextSplitted));

    let pastingStrategy = PastingFactory.getStrategy(settings);
    pastingStrategy.execute(objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings);

    if (INITIATION_METHOD === 'on_hover') {
        initHover();
    }
    if (INITIATION_METHOD === 'on_tap') {
        initTap();
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

const setHoverText2Tag = (tag, originalTextSplitted, translatedTextSplitted) => {
    if (tag && tag.innerText.length > 0) {
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
                                    '<hover data-translated-text="' + translatedTextSplitted[translateIndex].replace(/\.$/, "") + '">' + originalTextItem + '</hover>'
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

const setTapText2Tag = (tag, originalTextSplitted, translatedTextSplitted) => {
    if (tag && tag.innerText.length > 0) {
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
                                    '<tap data-translated-text="' + translatedTextSplitted[translateIndex].replace(/\.$/, "") + '">' + originalTextItem + '</tap>'
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

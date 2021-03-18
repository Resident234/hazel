import {DELIMITER_FOR_TRANSLATED_TEXT, DELIMITER_TEXT, prepareDelimiters} from "../../components/delimiters";
import {excludeTextTags} from "../tags";

export const pageOnload = (tag, originalTextSplitted, translatedTextSplitted) => {
    if (tag && tag.innerText.length > 0) {
        if (
            !tag.classList.contains('js-translator-delimiter') &&
            !tag.classList.contains('js-translator-tag-has-translated')
        ) {
            let objExcludeTextTags = excludeTextTags();
            //console.log(originalTextSplitted);
            let indexesToRemove = [];
            originalTextSplitted.forEach((originalTextItem, translateIndex) => {
                //console.log(originalTextItem);
                originalTextItem = originalTextItem.trim();
                if (originalTextItem.length > 0) {
                    let hasTranslated = false;

                    /** обработчка случая , при котором в тексте содержится тег , не участвующий в переводе , но содержащий текст */
                    let isContainExcludeText = false;
                    let excludeTextIndexes = originalTextItem.match(/<==(.*?)==>/g);
                    if (excludeTextIndexes) {
                        excludeTextIndexes.forEach((excludeTextIndex) => {
                            excludeTextIndex = excludeTextIndex.replace('<==', '').replace('==>', '');
                            if (excludeTextIndex !== originalTextItem) {
                                let originalTextItemPrev = originalTextItem;
                                if (objExcludeTextTags[excludeTextIndex]) {
                                    originalTextItem = originalTextItem.replace(
                                        '<==' + (excludeTextIndex) + '==>',
                                        objExcludeTextTags[excludeTextIndex].innerText
                                    );
                                }
                                if (originalTextItemPrev !== originalTextItem) {
                                    isContainExcludeText = true;
                                }
                            }
                        });
                    }

                    //console.log(originalTextItem);
                    //console.log(isContainExcludeText);
                    //console.log('----------');

                    if (
                        (
                            !isContainExcludeText &&
                            tag.innerHTML.includes(originalTextItem) &&
                            tag.innerText.includes(originalTextItem) &&
                            originalTextItem.length > 0
                        ) ||
                        (
                            isContainExcludeText &&
                            //tag.innerHTML.includes(originalTextItemHTML) &&
                            tag.innerText.includes(originalTextItem) &&
                            originalTextItem.length > 0
                        )
                    ) {
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
                                let translatedText = translatedTextSplitted[translateIndex].replace(/\.$/, "");
                                /** защита от повторной замены **/
                                let normalizedOriginalText = prepareDelimiters(tag.innerText);
                                if (!normalizedOriginalText.includes(originalTextItem + '.' + translatedText)) {
                                    //console.log(normalizedOriginalText);
                                    //console.log(originalTextItem + '. ' + translatedText);
                                    //console.log('----------');
                                    tag.innerHTML = tag.innerHTML.replace(
                                        originalTextItem,
                                        originalTextItem + '. ' + translatedText
                                    );
                                    hasTranslated = true;
                                    tag.classList.add('js-translator-tag-has-translated');
                                    if (innerHTMLPrev !== tag.innerHTML) {
                                        indexesToRemove.push(translateIndex);
                                    }
                                }
                            }
                        } else {
                            indexesToRemove.push(translateIndex);
                        }
                    }

                }
            });
            indexesToRemove.forEach((index) => {
                originalTextSplitted.splice(index, 1);
                translatedTextSplitted.splice(index, 1);
            });
        }
    }
}
